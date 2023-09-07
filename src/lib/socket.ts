import { type Readable, writable, readonly, get } from 'svelte/store'

export type SocketStore = {
  state: Readable<any>
  message: Readable<WebSocket['readyState']>
  open: (url: string | URL, protocols?: string | string[] | undefined) => void | Error
  close: (code?: number | undefined, reason?: string | undefined) => void
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void
}

type CreateSocketStore = (initialValue?: any) => SocketStore

export const createSocketStore: CreateSocketStore = (initialValue = null) => {
  let socket: WebSocket | null = null
  const state = writable<WebSocket['readyState']>(WebSocket.CLOSED)
  const message = writable<any>(initialValue)

  const open: SocketStore['open'] = (url, protocols) => {
    if (get(state) !== WebSocket.CLOSED) return new Error("SocketError: can't open socket - existing socket is not closed")

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
    const result = _open(url, protocols)
    if (result !== undefined) return result

    manuallyClosed = false
    clearReopenTimeout()

    const stateUnsubscribe = state.subscribe((value) => {
      if (value === WebSocket.CLOSED) {
        if (!manuallyClosed) setReopenTimeout(() => open(url, protocols), reopenTimeout)
        queueMicrotask(() => stateUnsubscribe())
      }
    })
  }

  const close: SocketStore['close'] = (code, reason) => {
    _close(code, reason)
    manuallyClosed = true
    clearReopenTimeout()
  }

  return { state, message, open, close, send }
}
