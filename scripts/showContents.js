const content = Array.from(document.getElementsByClassName('ndArticle_content clearmen'))[0];
const loginBlock = Array.from(document.getElementsByClassName('ndPaywall'))[0];


if (content && content.children && content.children[0]) {
  content.children[0].style.display='block'
}

if (loginBlock) {
  loginBlock.style.display='none'
}
