export function Framework(selector) {
  this.rootEl = document.querySelector(selector)

}

Framework.prototype.handle = function handle(...objects) {
  for (const obj of objects) {
    for (const key in obj) {
      const el = this.rootEl.querySelector(`[F-source="${key}"]`)
      if (!el) continue

      if (el.hasAttribute('F-many')) {
        el.innerHTML = obj[key].map(item => fillIn(el.innerHTML, item)).join('')
      } else {
        el.innerHTML = fillIn(el.innerHTML, obj[key])
      }
    }
  }

}

Framework.prototype.handlePreprocessed =
  function handlePreprocessed(obj, prepFn) {
    for (const key in obj) {
      const el = this.rootEl.querySelector(`[F-source="${key}"]`)
      if (!el) continue

      const template = el.innerHTML

      if (el.hasAttribute('F-many')) {
        const proxies = obj[key]
          .map(item => new Proxy(item, {set(o, prop, value) {
            o[prop] = value
            console.log("I've seen it!")
            el.innerHTML = obj[key]
              .map(item => fillIn(template, prepFn(item))).join('')
            return true
          }}))

        el.innerHTML = obj[key]
          .map(item => fillIn(template, prepFn(item))).join('')

        return proxies

      } else {
        const proxy = new Proxy(obj[key], {set(obj, prop, value) {
          obj[prop] = value
          el.innerHTML = fillIn(template, prepFn(obj))
          return true
        }})
        el.innerHTML = fillIn(template, prepFn(obj[key]))

        return proxy
      }
    }
  }

function fillIn(htmlTemplate, obj) {
  return htmlTemplate.replace(/{F}([^{}]*){F}/g, (_, key) => obj[key])
}
