function alert(content){
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
//修改主题颜色
function changePrimaryColor(color,backgroundColor){
const root = document.documentElement;
root.style.setProperty('--primary-color',color);
root.style.setProperty('--background-color',backgroundColor)
}



