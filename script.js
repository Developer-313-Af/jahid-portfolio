/* ===== PERSONAL SETTINGS: customize these values ===== */
const CONTACT_EMAIL = ""; // Put your real email here, e.g. "name@gmail.com"
const GITHUB_URL = "https://github.com/"; // Replace with your GitHub profile URL when ready
/* ==================================================== */
const body=document.body, langBtn=document.getElementById('langBtn'), themeBtn=document.getElementById('themeBtn'), menuBtn=document.getElementById('menuBtn'), nav=document.getElementById('nav');
let lang=localStorage.getItem('jahid-lang')||'fa';
function setLanguage(next){lang=next;document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';body.classList.toggle('en',lang==='en');document.querySelectorAll('[data-fa][data-en]').forEach(el=>{el.textContent=el.dataset[lang]});langBtn.textContent=lang==='fa'?'EN / فارسی':'فارسی / EN';localStorage.setItem('jahid-lang',lang)}
langBtn.addEventListener('click',()=>setLanguage(lang==='fa'?'en':'fa'));
themeBtn.addEventListener('click',()=>{body.classList.toggle('light');localStorage.setItem('jahid-theme',body.classList.contains('light')?'light':'dark')});
if(localStorage.getItem('jahid-theme')==='light')body.classList.add('light');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
/* Font family picker: local browser fonts + user-selected custom font file */
const fontSelect=document.getElementById('fontSelect'), fontUpload=document.getElementById('fontUpload'), fontUploadBtn=document.getElementById('fontUploadBtn');
function setFont(family){document.documentElement.style.setProperty('--font',family==='system'?'system-ui, sans-serif':`"${family}", Tahoma, sans-serif`);if(fontSelect.querySelector(`option[value="${CSS.escape(family)}"]`))fontSelect.value=family;if(family!=='PortfolioCustomFont')localStorage.setItem('jahid-font',family)}
fontSelect.addEventListener('change',()=>setFont(fontSelect.value));
fontUploadBtn.addEventListener('click',()=>fontUpload.click());
fontUpload.addEventListener('change',()=>{const file=fontUpload.files?.[0];if(!file)return;const url=URL.createObjectURL(file),family='PortfolioCustomFont';let style=document.getElementById('customFontFace');if(!style){style=document.createElement('style');style.id='customFontFace';document.head.appendChild(style)}const ext=file.name.split('.').pop().toLowerCase(),format=ext==='woff2'?'woff2':ext==='woff'?'woff':ext==='otf'?'opentype':'truetype';style.textContent=`@font-face{font-family:${family};src:url("${url}") format("${format}");font-display:swap}`;const opt=document.createElement('option');opt.value=family;opt.textContent=file.name;opt.selected=true;fontSelect.appendChild(opt);setFont(family);const status=document.getElementById('formStatus');status.textContent=lang==='fa'?'فونت سفارشی در این نشست فعال شد.':'Custom font loaded for this session.'});
const savedFont=localStorage.getItem('jahid-font');if(savedFont&&savedFont!=='PortfolioCustomFont')setFont(savedFont);
/* Contact form uses mailto: it works with a configured email + a mail app/browser handler. */
const contactForm=document.getElementById('contactForm'),formStatus=document.getElementById('formStatus');
contactForm.addEventListener('submit',event=>{event.preventDefault();if(!contactForm.reportValidity())return;if(!CONTACT_EMAIL.trim()){formStatus.textContent=lang==='fa'?'ایمیل مقصد تنظیم نشده است. در بالای script.js مقدار CONTACT_EMAIL را وارد کن.':'Recipient email is not configured. Set CONTACT_EMAIL near the top of script.js.';formStatus.classList.add('error');return}
const name=document.getElementById('visitorName').value.trim(),email=document.getElementById('visitorEmail').value.trim(),subject=document.getElementById('visitorSubject').value.trim(),message=document.getElementById('visitorMessage').value.trim();
const bodyText=`Name: ${name}\\nEmail: ${email}\\n\\n${message}`,mailto=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
formStatus.textContent=lang==='fa'?'برنامه ایمیل باز می‌شود؛ پیام را آنجا ارسال کن.':'Your email app is opening. Send the message from there.';formStatus.classList.remove('error');window.location.href=mailto;});
document.getElementById('copyEmail').addEventListener('click',async()=>{if(!CONTACT_EMAIL.trim()){formStatus.textContent=lang==='fa'?'ابتدا ایمیل خود را در CONTACT_EMAIL داخل script.js تنظیم کن.':'Set your email in CONTACT_EMAIL inside script.js first.';formStatus.classList.add('error');return}try{await navigator.clipboard.writeText(CONTACT_EMAIL);formStatus.textContent=lang==='fa'?'ایمیل کپی شد.':'Email copied.';formStatus.classList.remove('error')}catch(e){formStatus.textContent=CONTACT_EMAIL}});
document.querySelectorAll('a[href="https://github.com/"]').forEach(a=>a.href=GITHUB_URL);
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
setLanguage(lang);