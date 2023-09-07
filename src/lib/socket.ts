import { type Readable, writable, readonly } from 'svelte/store'

export type SocketStore = {
  state: Readable<any>
  message: Readable<WebSocket['readyState']>
  open: (url: string | URL, protocols?: string | string[] | undefined) => void
  close: (code?: number | undefined, reason?: string | undefined) => void
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void
}

type CreateSocketStore = (initialValue?: any) => SocketStore

export const createSocketStore: CreateSocketStore = (initialValue = null) => {
  let socket: WebSocket | null = null
  const state = writable<WebSocket['readyState']>(WebSocket.CLOSED)
  const message = writable<any>(initialValue)

  const open: SocketStore['open'] = (url, protocols) => {
    state.set(WebSocket.CONNECTING)
    socket = new WebSocket(url, protocols)
    socket.onopen = () => state.set(WebSocket.OPEN)
    socket.onclose = () => state.set(WebSocket.CLOSED)
    socket.onmessage = (event) => message.set(event.data)
  }

  const close: SocketStore['close'] = (code, reason) => {
    socket?.close(code, reason)
  }

  const send: SocketStore['send'] = (data) => {
    const stateUnsubscribe = state.subscribe((value) => {
      if (value === WebSocket.OPEN) {
        socket?.send(data)
        queueMicrotask(() => stateUnsubscribe())
      }
    })
  }

  return {
    state: readonly(state),
    message: readonly(message),
    open,
    close,
    send,
  }
}

type CreateReopenableSocketStore = (initialValue?: any, reopenTimeout?: number) => SocketStore

export const createReopenableSocketStore: CreateReopenableSocketStore = (initialValue = null, reopenTimeout = 2000) => {
  const { state, message, open: _open, close: _close, send } = createSocketStore(initialValue)
  let manuallyClosed = true
  let reopenTimeoutID: number | null = null

  const clearReopenTimeout = () => {
    if (reopenTimeoutID !== null) {
      clearTimeout(reopenTimeoutID)
      reopenTimeoutID = null
    }
  }

  const setReopenTimeout = (callback: SocketStore['open'], timeout: number) => {
    clearReopenTimeout()
    reopenTimeoutID = setTimeout(callback, timeout)
  }

  const open: SocketStore['open'] = (url, protocols) => {
    manuallyClosed = false
    clearReopenTimeout()
    _open(url, protocols)

    const stateUnsubscribe = state.subscribe((value) => {
      if (value === WebSocket.CLOSED) {
        if (!manuallyClosed) setReopenTimeout(() => open(url, protocols), reopenTimeout)
        queueMicrotask(() => stateUnsubscribe())
      }
    })
  }

  const close: SocketStore['close'] = (code, reason) => {
    manuallyClosed = true
    clearReopenTimeout()
    _close(code, reason)
  }

  return { state, message, open, close, send }
}
