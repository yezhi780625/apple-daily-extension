$(async () => {
  const $login = $('.ndPaywall')
  if ($login.length > 0) {
    const body = await fetch(location)
    const html = await body.text()
    const $html = $(html)
    const $article = $html.find('.ndArticle_margin')
    $login.replaceWith($article)
    $article.show()
    const $video = $html.find('.thoracis')
    $('.thoracis').replaceWith($video)
    $video.find('.mediabox').show()
  }
})
