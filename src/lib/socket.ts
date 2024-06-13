import { type Readable, writable, readonly, get } from 'svelte/store'

export type SocketStore<T> = {
  state: Readable<WebSocket['readyState']>
  message: Readable<T | undefined>
  open: (url: string | URL, protocols?: string | string[] | undefined) => void | Error
  close: (code?: number | undefined, reason?: string | undefined) => void
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void
}

export const createSocketStore = <T>(value?: T | undefined): SocketStore<T> => {
  let socket: WebSocket | null = null
  const state = writable<WebSocket['readyState']>(WebSocket.CLOSED)
  const message = writable<T>(value)

  return {
    state: readonly(state),
    message: readonly(message),

    open: (url, protocols) => {
      if (get(state) !== WebSocket.CLOSED) return new Error('socket is not closed')
      state.set(WebSocket.CONNECTING)
      socket = new WebSocket(url, protocols)
      socket.onopen = () => state.set(WebSocket.OPEN)
      socket.onclose = () => state.set(WebSocket.CLOSED)
      socket.onmessage = (event) => message.set(event.data as T)
    },

    close: (code, reason) => {
      state.set(WebSocket.CLOSING)
      socket?.close(code, reason)
    },

    send: (data) => {
      const stateUnsubscribe = state.subscribe((value) => {
        if (value !== WebSocket.OPEN) return
        socket?.send(data)
        queueMicrotask(() => stateUnsubscribe())
      })
    },
  }
}

export const reopenable = <T>(socket: SocketStore<T>, timeout = 3000): SocketStore<T> => {
  let isManuallyClosed: boolean = true
  let timeoutId: number | null = null

  const clearReopenTimeout = () => {
    if (timeoutId === null) return
    clearTimeout(timeoutId)
    timeoutId = null
  }

  const setReopenTimeout = (callback: SocketStore<T>['open'], timeout: number) => {
    clearReopenTimeout()
    timeoutId = setTimeout(callback, timeout)
  }

  const open: SocketStore<T>['open'] = (url, protocols) => {
    isManuallyClosed = false
    clearReopenTimeout()
    socket.open(url, protocols)

    const stateUnsubscribe = socket.state.subscribe((value) => {
      if (value !== WebSocket.CLOSED) return
      if (!isManuallyClosed) setReopenTimeout(() => open(url, protocols), timeout)
      queueMicrotask(() => stateUnsubscribe())
    })
  }

  const close: SocketStore<T>['close'] = (code, reason) => {
    isManuallyClosed = true
    clearReopenTimeout()
    socket.close(code, reason)
  }

  return {
    state: socket.state,
    message: socket.message,
    open: open,
    close: close,
    send: socket.send,
  }
}
