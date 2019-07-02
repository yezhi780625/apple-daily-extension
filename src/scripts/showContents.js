$(async () => {
  const enabled = await getEnabled();
  if (!enabled) return;
  const body = await fetch(location);
  const html = await body.text();
  const $html = $(html);
  const $wrapper = $html.filter((i, el) => $(el).hasClass('wrapper'));

  const $scripts = $wrapper.find('script');
  $scripts.each((i, el) => {
    const $el = $(el);
    $el.html(
      $el
        .html()
        .replace(/document.write\(/g, '(() => {})(')
        .replace('switch(e){', 'switch("ad"){')
        .replace('OMOSDK.auth().getUserInfo().isLoggedIn', 'true')
        .replace('omoUserType != "2"', 'true')
        .replace('if(isUserEntitled){', 'if(true){')
        .replace(
          /var ([A-Za-z0-9]+) = setInterval\(function\(\) {/g,
          'clearInterval($1); var $1 = setInterval(function() { return;'
        )
    );
  });
  $('.wrapper')
    .html('')
    .append($wrapper);
});
