$(async () => {
  await (() => new Promise(resolve => setTimeout(resolve, 1000)))();
  const enabled = await getEnabled();
  if (!enabled) return;
  const body = await fetch(location);
  const html = await body.text();
  const $html = $(html);
  const $wrapper = $html.filter((i, el) => $(el).hasClass('wrapper'));
  if ($wrapper.find('.ndArticle_contentBox').length === 0) return;
  const $scripts = $wrapper.find('script');
  $scripts.each((i, el) => {
    const $el = $(el);
    $el.html(
      $el
        .html()
        .replace(/document.write\(/g, '(() => {})(')
        .replace(
          `var effects =`,
          `var effects = () => { $('.ndAritcle_headPic,.ndArticle_margin,.mediabox,.articulum').css('visibility','visible').show(); throw new Error('peace!'); }; false ===`
        )
        .replace('switch(e){', 'switch("ad"){')
        .replace('OMOSDK.auth().getUserInfo().isLoggedIn', 'true')
        .replace('omoUserType != "2"', 'false')
        .replace('if(isUserEntitled){', 'if(true){')
        .replace('(storageSupported && !localExpired)', '(false)')
        .replace(
          `if(typeof(paywall) == 'undefined' || typeof(OMOSDK) != 'object' || typeof(OMOSDK.auth) != 'function'){`,
          'if (false){'
        )
        .replace(
          `$('.ndgFixedtop').css({'height': topFixedheight + 'px'});`,
          `$('.ndgFixedtop').css({'height': 0});`
        )
    );
  });
  $('.wrapper')
    .html('')
    .append($wrapper);
});
