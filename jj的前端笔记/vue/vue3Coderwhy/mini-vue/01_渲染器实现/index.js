const createApp = (appOptions) => {

  return {
    mount(query) {
      const el = document.querySelector(query)
      let isMounted = false
      let oldVnode = null
      watchEffect(function () {
        if (!isMounted) {
          oldVnode = appOptions.render()
          mount(oldVnode, el)
          isMounted = true
        } else {
          const newVnode = appOptions.render()
          patch(oldVnode, newVnode)
          oldVnode = newVnode
        }
      })
    }
  }
}