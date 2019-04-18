$(async () => {
  const body = await fetch(location)
  const html = await body.text()
  const $html = $(html)
  const $wrapper = $html.filter((i, el) => $(el).hasClass('wrapper'))

  $wrapper.find('script').filter((i, el) => el.innerText.indexOf('document.write') >= 0).remove()
  const injectJs = $(`
    <script>
      confirmOMOmember = () => {
        console.log('%c fake login confirm ;)', 'background: #222; color: #bada55')
        return true
      }
      console.log('%c inject confirmOMOmember success!', 'background: #222; color: #bada55')
    </script>
  `)
  $('.wrapper').html('').append(injectJs).append($wrapper)
})
