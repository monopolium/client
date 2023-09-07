export const getToken = async (url: string | URL) => {
  let token = sessionStorage.getItem(`token-${url}`)

  if (token === null) {
    const response = await fetch(url, { method: 'GET' })

    if (response.status === 200) {
      const json = await response.json()
      token = (await json?.token) ?? null
      if (token === null) return Promise.reject(new Error('Token fetch error'))
      sessionStorage.setItem(`token-${url}`, token)
    }
  }

  return token
}
