(window.webpackJsonpCaster=window.webpackJsonpCaster||[]).push([[0],{241:function(e,n,t){e.exports=t(528)},254:function(e,n){},256:function(e,n){},272:function(e,n){},274:function(e,n){},443:function(e,n){},520:function(e,n,t){},523:function(e,n){},524:function(e,n){},525:function(e,n){},527:function(e,n,t){},528:function(e,n,t){"use strict";t.r(n);var a=t(141),o=t(142),r=t(144),c=t(143),i=t(145),s=t(140),l=t(93),u=(t(515),t(2)),d=t.n(u),f=t(239),m=t.n(f),g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function h(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var p=t(530),w=t(531);t(520);function y(e){return d.a.createElement("picture",{className:e.className},d.a.createElement("source",{srcSet:"".concat(e.src,".webp"),type:"image/webp"}),d.a.createElement("source",{srcSet:"".concat(e.src,".png"),type:"image/png"}),d.a.createElement("img",{src:"".concat(e.src,".png"),alt:""}))}function v(e){var n=e.signIn,t=e.tryAnonymously,a=d.a.createElement("a",{href:"https://blockstack.org/"},"Blockstack");return d.a.createElement("div",{className:"signin"},d.a.createElement("div",{className:"signin-inner"},d.a.createElement("h1",null,"Caster is a encrypted, decentralised, syncing podcast player"),d.a.createElement("p",null,"(That's a mouthful)"),d.a.createElement("div",{className:"intro"},d.a.createElement(y,{className:"intro-image",src:"mobile_30_08_2019"}),d.a.createElement("div",{className:"intro-text"},d.a.createElement("h2",null,"Here's how it works:"),d.a.createElement("p",null,"You can try out Caster by clicking the button below. In order to sync podcasts though, you'll need a ",a," identity. Making one is the same as signing up for any other online account, a process you've probably done hundreds of times."),d.a.createElement("p",null,"This will provide you with a ",d.a.createElement("a",{href:"https://blockstack.org/try-blockstack"},"universal login")," which you can use to access any Blockstack app. You'll also get a private encryption key, which is used to encrypt infomation about your podcast feeds."),d.a.createElement("button",{onClick:n,type:"button"},d.a.createElement(p.a,null),"Create ID/Log In"),d.a.createElement("button",{onClick:t,type:"button"},d.a.createElement(w.a,null),"Try without making an ID")))))}t(523),t(524),t(525),t(526),t(527);var b=new s.AppConfig;b.manifestPath="/caster/manifest.json",b.redirectPath="/caster",console.log("Manifest path: ".concat(b.manifestURI())),console.log("Redirect path: ".concat(b.redirectURI()));var k=new s.UserSession({appConfig:b});l.locale(window.navigator.language);var E=d.a.lazy((function(){return Promise.all([t.e(3),t.e(4)]).then(t.bind(null,681))})),I=function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(r.a)(this,Object(c.a)(n).call(this,e))).state={anonymous:!1},t}return Object(i.a)(n,e),Object(o.a)(n,[{key:"render",value:function(){var e=this;return k.isUserSignedIn()||this.state.anonymous?d.a.createElement(u.Suspense,{fallback:d.a.createElement(d.a.Fragment,null)},d.a.createElement(E,{userSession:k,signOut:function(){return k.signUserOut(b.redirectURI())}})):d.a.createElement(v,{signIn:function(){return k.redirectToSignIn()},tryAnonymously:function(){return e.setState({anonymous:!0})}})}},{key:"componentDidMount",value:function(){k.isSignInPending()&&k.handlePendingSignIn().then((function(){window.location.href=b.redirectURI()}))}}]),n}(u.Component);m.a.render(d.a.createElement(I,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/caster",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/caster","/service-worker.js");g?(!function(e,n){fetch(e).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):h(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):h(n,e)}))}}()}},[[241,1,2]]]);
//# sourceMappingURL=main.9bd3ed59.chunk.js.map