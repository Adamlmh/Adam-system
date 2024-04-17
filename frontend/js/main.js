function alert(content){
  console.log(1);
  const alert = document.createElement('div');
  alert.className='alert';
  alert.textContent=content;
  document.body.appendChild(alert);
  setTimeout(() => {
    document.body.removeChild(alert);
  }, 2000);
}
//检查是否有token（防止直接改路由黑进）
function verifyToken(){
if(window.location.pathname !== '/login/index.html'){
const token = localStorage.getItem('token');
if(!token){
  location.href='../login/index.html'
}
}
console.log(window.location.pathname);
}
window.addEventListener("load",verifyToken);