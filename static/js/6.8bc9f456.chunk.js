(window.webpackJsonpCaster=window.webpackJsonpCaster||[]).push([[6],{206:function(e,t){},207:function(e,t){},370:function(e,t){},379:function(e,t,a){},396:function(e,t,a){},397:function(e,t,a){},398:function(e,t,a){},399:function(e,t,a){},401:function(e,t,a){},407:function(e,t,a){},408:function(e,t,a){},682:function(e,t,a){"use strict";a.r(t);var n=a(195),i=a(67),r=a.n(i),s=a(196),l=a(3),o=a(4),c=a(6),u=a(5),d=a(8),p=a(7),m=a(315),h=a.n(m),f=a(0),v=a.n(f),y=a(679),g=a(680),E=a(317),k=a(664),b=a(325),S={fields:{meta:["title","description","imageURL"],episodes:["title","description","imageURL","pubDate","enclosure","duration","guid"]},required:{meta:["title","description"],episodes:[]}};function w(e,t){return O.apply(this,arguments)}function O(){return(O=Object(s.a)(r.a.mark((function e(t,a){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Requesting '".concat(a,"' via '").concat(t,"'")),n=t.endsWith("/")?t+a:"".concat(t,"/").concat(a),e.abrupt("return",Object(b.getPodcastFromURL)(n,S));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e,t,a){return e.putFile(t,JSON.stringify(a),{})}function C(e,t){return N.apply(this,arguments)}function N(){return(N=Object(s.a)(r.a.mark((function e(t,a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.getFile(a,{}).then((function(e){return e instanceof ArrayBuffer?{}:JSON.parse(e)||{}})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,t){return e.episode.imageURL||t[e.feedUrl].data.meta.imageURL}function x(e){var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),n=Math.floor(e%60);return"".concat(F(t),":").concat(F(a),":").concat(F(n))}function F(e){return e.toString().padStart(2,"0")}var R=a(668),T=a(666),L=a(669),U=a(667),V=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.audioPlayer,a=e.fallback,n=this.toggle.bind(this);return t.isLoaded()?t.isPaused()?v.a.createElement(T.a,{onClick:n}):v.a.createElement(U.a,{onClick:n}):a||null}},{key:"toggle",value:function(e){var t=this.props.audioPlayer;e.stopPropagation(),t.toggle()}}]),t}(f.Component);function A(e){var t=e.seekAmount,a=e.audioPlayer;return v.a.createElement("div",{className:"desktop-player"},v.a.createElement(R.a,{onClick:function(){return a.seekRelative(-t)}}),v.a.createElement(V,{audioPlayer:a,fallback:v.a.createElement(T.a,null)}),v.a.createElement(L.a,{onClick:function(){return a.seekRelative(+t)}}),v.a.createElement("p",null,x(a.time())),v.a.createElement("input",{className:"player-range-bar",type:"range",min:"0",value:a.time(),max:a.duration(),step:"any",onChange:function(e){return a.seekTo(e.target.value)}}),v.a.createElement("p",null,x(a.duration())))}function H(e){var t=e.audioPlayer;return v.a.createElement("div",{className:"player-bar",style:{display:t.isLoaded()?"inherit":"none"}},v.a.createElement("div",{className:"player-bar-inner"},v.a.createElement("div",{className:"player-bar-progress",style:{width:"".concat(100*t.fraction(),"%")}})))}a(379);function M(e){var t=e.feeds,a=e.openEpisode,n=e.settings,i=e.audioPlayer,r=i.getEpRef(),s=r?r.episode:null,l=s?s.title:null,o=r?t[r.feedUrl].data.meta.title:null,c=function(){return r?a(r):null};return v.a.createElement("div",{className:"player"},v.a.createElement(H,{audioPlayer:i}),v.a.createElement("div",{className:"player-image",onClick:c},r?v.a.createElement("img",{src:P(r,t),alt:""}):null),v.a.createElement("div",{className:"player-description",onClick:c},v.a.createElement("p",{className:"player-description-title"},l),v.a.createElement("p",{className:"player-description-subtitle"},o),v.a.createElement("p",{className:"player-description-time"},r?"".concat(x(i.time()),"/").concat(x(i.duration())):null)),v.a.createElement("div",{className:"player-button"},v.a.createElement(V,{audioPlayer:i})),v.a.createElement(A,Object.assign({},e,{audioPlayer:i,seekAmount:n.seekAmount})),v.a.createElement("div",{className:"desktop-player-description"},v.a.createElement("h2",null,l),v.a.createElement("h3",null,o),v.a.createElement("p",{dangerouslySetInnerHTML:{__html:s?s.description:""}})))}var D=a(380),I=a(670),K=a(671),z=a(672),B=a(673),J=a(674);function $(e){var t=e.onClick,a=e.icon,n=e.text;return v.a.createElement("div",{onClick:t,className:"sidenav-item"},v.a.createElement("div",{className:"sidenav-icon"},a),v.a.createElement("p",null,n))}a(396);var _,q=v.a.memo((function(e){var t=e.open,a=e.openSettings,n=e.openHome,i=e.openSearch,r=e.changeState,s=e.signOut;return v.a.createElement("div",{className:"menu-button"},v.a.createElement(D.slide,{isOpen:t,customBurgerIcon:v.a.createElement(I.a,null),onStateChange:function(e){return r(e.isOpen)}},v.a.createElement($,{icon:v.a.createElement(K.a,null),text:"Home",onClick:n}),v.a.createElement($,{icon:v.a.createElement(z.a,null),text:"Search",onClick:i}),v.a.createElement($,{icon:v.a.createElement(B.a,null),text:"Settings",onClick:a}),v.a.createElement($,{icon:v.a.createElement(J.a,null),text:"Sign Out",onClick:s})))}));!function(e){e.Feeds="Feeds",e.Settings="Settings",e.Viewing="Viewing",e.Search="Search"}(_||(_={}));var W={corsProxy:"https://caster-cors-proxy.herokuapp.com",toggle:"p",seekBackwards:",",seekForwards:".",seekAmount:5};a(397);function G(e){var t=e.epRef,a=e.feeds,n=a[t.feedUrl].data;return v.a.createElement("div",{className:"episode-view"},v.a.createElement("h2",null,t.episode.title),v.a.createElement("h3",null,n.meta.title),v.a.createElement("div",{className:"episode-view-image"},v.a.createElement("img",{src:P(t,a),alt:""})),v.a.createElement(Q,e),v.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.episode.description}}))}function Q(e){var t=e.epRef,a=e.audioPlayer,n=e.settings,i=a.getEpRef()===t,r=n.seekAmount;return i?v.a.createElement("div",{className:"episode-player"},v.a.createElement("p",null,x(a.time())),v.a.createElement(R.a,{onClick:function(){return a.seekRelative(-r)},size:"32px"}),v.a.createElement(X,e),v.a.createElement(L.a,{onClick:function(){return a.seekRelative(+r)},size:"32px"}),v.a.createElement("p",null,x(a.duration()))):v.a.createElement("div",{className:"episode-player"},v.a.createElement(R.a,{size:"32px"}),v.a.createElement(X,e),v.a.createElement(L.a,{size:"32px"}))}function X(e){var t=e.audioPlayer,a=e.playEpisode,n=e.epRef;return t.getEpRef()===n?t.isPaused()?v.a.createElement(T.a,{onClick:function(){return t.toggle()},size:"36px"}):v.a.createElement(U.a,{onClick:function(){return t.toggle()},size:"36px"}):v.a.createElement(T.a,{onClick:function(){return a(n)},size:"36px"})}var Y=a(676),Z=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={entered:e.defaultValue||""},a.handleKey=a.handleKey.bind(Object(d.a)(a)),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return v.a.createElement("input",{type:"text",value:this.state.entered,className:this.props.className,onChange:function(t){return e.setState({entered:t.target.value})},onKeyDown:this.handleKey,placeholder:this.props.placeholder})}},{key:"handleKey",value:function(e){var t=this.state.entered;e.stopPropagation(),"Enter"===e.key&&t&&(this.setState({entered:""}),this.props.callback(t))}}]),t}(f.Component),ee=a(675),te=a(2),ae=a.n(te);a(398);function ne(e){var t=e.className,a=e.onClick,n=e.image,i=e.title,r=e.body,s=e.icons;return v.a.createElement("div",{className:"item ".concat(t),onClick:a},v.a.createElement("div",{className:"item-image"},v.a.createElement("img",{src:n,alt:""})),v.a.createElement("div",{className:"item-inner"},v.a.createElement("h2",null,i),r),v.a.createElement("div",{className:"item-icons"},s))}function ie(e){var t=e.feeds,a=e.url,n=e.openFeed,i=e.deleteFeed,r=t[a].data;return v.a.createElement(ne,{title:r.meta.title,image:r.meta.imageURL,body:v.a.createElement(v.a.Fragment,null,v.a.createElement("p",null,r.meta.description),v.a.createElement("p",null,r.episodes.length," episodes"),v.a.createElement("p",null,"Last refreshed ",ae()(t[a].time).fromNow())),onClick:function(){return n(a)},icons:v.a.createElement(ee.a,{onClick:function(e){e.stopPropagation(),i(a)}})})}a(399);var re=v.a.memo((function(e){var t=e.feeds,a=e.addFeed;return v.a.createElement(v.a.Fragment,null,Object.keys(t).map((function(t){return v.a.createElement(ie,Object.assign({key:t,url:t},e))})),v.a.createElement("div",{className:"add-feed"},v.a.createElement(Y.a,null),v.a.createElement(Z,{placeholder:"Podcast Feed URL",callback:a})))})),se=a(677);function le(e){var t=e.episode,a=e.feeds,n=e.openEpisode,i=e.playEpisode;return v.a.createElement(ne,{title:t.episode.title,image:P(t,a),body:v.a.createElement("p",null,ae()(t.episode.pubDate).format("L LT")),icons:v.a.createElement(v.a.Fragment,null,v.a.createElement(T.a,{onClick:function(){return i(t)}}),v.a.createElement(se.a,{onClick:function(){return n(t)}})),className:"episode"})}var oe=v.a.memo((function(e){var t=e.feeds,a=e.feedUrl,n=t[a].data.episodes.map((function(t){return v.a.createElement(le,Object.assign({key:t.guid,episode:{episode:t,feedUrl:a}},e))}));return v.a.createElement(v.a.Fragment,null,n)})),ce=a(400),ue=a.n(ce),de=(a(401),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={searchTerm:""},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.feeds,a=this.state.searchTerm,n=Object.keys(t).flatMap((function(e){return t[e].data.episodes.map((function(t){return{ref:{episode:t,feedUrl:e},episodeTitle:t.title,episodeDescription:t.description}}))})),i=ue.a.go(a,n,{limit:50,keys:["episodeTitle","episodeDescription"],threshold:-500}).map((function(t){return v.a.createElement(le,Object.assign({key:t.obj.ref.episode.guid,episode:t.obj.ref},e.props))}));return v.a.createElement("div",{className:"search"},v.a.createElement("div",{className:"search-body"},i.length?i:v.a.createElement("h1",null,"No Search Term Entered")),v.a.createElement("div",{className:"search-input"},v.a.createElement(z.a,null),v.a.createElement("input",{type:"text",placeholder:"Search Term",onChange:function(t){return e.setState({searchTerm:t.target.value})},value:a})))}}]),t}(f.PureComponent)),pe=a(665),me=a(678),he=a(402),fe=a.n(he),ve=(a(407),function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.settings,n=t.updateSettings,i=a.corsProxy,r=a.toggle,s=a.seekBackwards,l=a.seekForwards;return v.a.createElement("div",{className:"settings"},v.a.createElement("p",null,"Many websites do not allow you to request RSS feeds from inside a browser, so you need to use a proxy to access them. I've set up ","https://caster-cors-proxy.herokuapp.com"," which you are totally free to use, but if you want to setup a proxy yourself you can follow ",v.a.createElement("a",{href:"https://devcenter.heroku.com/articles/getting-started-with-nodejs"},"this guide")," with the ",v.a.createElement("a",{href:"https://caster-cors-proxy.herokuapp.com"},"CORS Anywhere"),"."),v.a.createElement("label",null,"CORS Proxy:"),v.a.createElement("input",{type:"url",pattern:"https?://.*",value:i,onChange:function(t){return e.updateProxy(t.target.value)},style:ge(fe()(i))}),v.a.createElement("label",null,"Pause/Play Toggle:"),v.a.createElement("input",{type:"text",value:r,style:ge(ye(r)[1]),onChange:function(t){return e.updateCharacter("toggle",t.target.value)}}),v.a.createElement("label",null,"Seek Backwards:"),v.a.createElement("input",{type:"text",value:s,style:ge(ye(s)[1]),onChange:function(t){return e.updateCharacter("seekBackwards",t.target.value)}}),v.a.createElement("label",null,"Seek Forwards:"),v.a.createElement("input",{type:"text",value:l,style:ge(ye(l)[1]),onChange:function(t){return e.updateCharacter("seekForwards",t.target.value)}}),v.a.createElement("button",{onClick:function(){return n(W,!0)},type:"button"},v.a.createElement(me.a,null),"Reset"))}},{key:"updateProxy",value:function(e){this.props.updateSettings({corsProxy:e},fe()(e))}},{key:"updateCharacter",value:function(e,t){var a=ye(t),i=Object(pe.a)(a,2),r=i[0],s=i[1];this.props.updateSettings(Object(n.a)({},e,r),s)}}]),t}(f.Component));function ye(e){return e.length>0?[e[e.length-1].toLowerCase(),!0]:["",!1]}function ge(e){return{border:"1px solid ".concat(e?"green":"red")}}var Ee=function(){function e(t,a,n){var i=this;Object(l.a)(this,e),this.audio=void 0,this.epRef=void 0,this.timer=void 0,this.syncTimer=void 0,this.refresh=void 0,this.syncCallback=void 0,this.audio=document.createElement("audio"),this.epRef=null,this.timer=null,this.syncTimer=null,this.refresh=t,this.syncCallback=a,this.sync=this.sync.bind(this),this.end=this.end.bind(this),this.audio.ondurationchange=t,this.audio.onended=this.end,navigator.mediaSession&&(navigator.mediaSession.setActionHandler("play",this.play.bind(this)),navigator.mediaSession.setActionHandler("pause",this.pause.bind(this)),navigator.mediaSession.setActionHandler("seekbackward",(function(){return i.seekRelative(-n)})),navigator.mediaSession.setActionHandler("seekforward",(function(){return i.seekRelative(+n)})))}return Object(o.a)(e,[{key:"end",value:function(){console.log("stopped"),this.pause(),navigator.mediaSession&&(navigator.mediaSession.playbackState="none")}},{key:"getEpRef",value:function(){return this.epRef}},{key:"loadEp",value:function(e,t,a,n){if(this.audio.src=e.episode.enclosure.url,this.epRef=e,this.audio.currentTime=n,a?this.playNoCallback():this.pauseNoCallback(),navigator.mediaSession){var i=t[e.feedUrl].data.meta;navigator.mediaSession.metadata=new MediaMetadata({title:e.episode.title,artist:i.title,artwork:[{src:P(e,t)}]})}this.refresh()}},{key:"isLoaded",value:function(){return null!==this.getEpRef()}},{key:"isPaused",value:function(){return this.audio.paused}},{key:"isPlaying",value:function(){return!this.audio.paused}},{key:"toggle",value:function(){this.audio.paused?this.play():this.pause()}},{key:"sync",value:function(){null!==this.epRef&&this.syncCallback({epRef:this.epRef,time:this.time()})}},{key:"playNoCallback",value:function(){this.audio.play(),navigator.mediaSession&&(navigator.mediaSession.playbackState="playing"),this.timer=window.setInterval(this.refresh,1e3),this.syncTimer=window.setInterval(this.sync,3e4)}},{key:"pauseNoCallback",value:function(){this.audio.pause(),navigator.mediaSession&&(navigator.mediaSession.playbackState="paused"),null!==this.timer&&(window.clearInterval(this.timer),this.timer=null),null!==this.syncTimer&&(window.clearInterval(this.syncTimer),this.syncTimer=null)}},{key:"play",value:function(){this.playNoCallback(),this.refresh()}},{key:"pause",value:function(){this.pauseNoCallback(),this.refresh(),this.sync()}},{key:"time",value:function(){return this.audio.currentTime}},{key:"fraction",value:function(){return this.time()/this.duration()}},{key:"duration",value:function(){return this.audio.duration||0}},{key:"seekTo",value:function(e){this.audio.currentTime=e,this.refresh()}},{key:"seekRelative",value:function(e){this.seekTo(this.audio.currentTime+e)}}]),e}();a(408);a.d(t,"default",(function(){return ke}));var ke=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).saveTimer=null,a.audioPlayer=void 0,a.openHome=function(){return a.setState({view:_.Feeds,sidenavOpen:!1})},a.openSettings=function(){return a.setState({view:_.Settings,sidenavOpen:!1})},a.openSearch=function(){return a.setState({view:_.Search,sidenavOpen:!1})},a.setSideNav=function(e){return a.setState({sidenavOpen:e})},a.openViewing=function(e){return a.setState({view:_.Viewing,viewing:e,sidenavOpen:!1})},a.state={feeds:{},settings:W,view:_.Feeds,viewing:void 0,sidenavOpen:!1,loading:!1},a.refresh=a.refresh.bind(Object(d.a)(a)),a.addFeed=a.addFeed.bind(Object(d.a)(a)),a.playEpisode=a.playEpisode.bind(Object(d.a)(a)),a.deleteFeed=a.deleteFeed.bind(Object(d.a)(a)),a.updateSettings=a.updateSettings.bind(Object(d.a)(a)),a.sync=a.sync.bind(Object(d.a)(a)),a.audioPlayer=new Ee((function(){return a.setState({})}),(function(e){return a.savePlaying(e)}),a.state.settings.seekAmount),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.sidenavOpen,n=t.loading;return v.a.createElement(k.a,{keyName:"*",onKeyDown:function(t,a){return e.handleKey(a.key)}},v.a.createElement("div",{className:"dashboard"},v.a.createElement("div",{className:"titlebar"},v.a.createElement(q,{open:a,openHome:this.openHome,openSettings:this.openSettings,openSearch:this.openSearch,changeState:this.setSideNav,signOut:this.props.signOut}),v.a.createElement("div",{className:"title"},v.a.createElement(E.Textfit,null,v.a.createElement("p",{className:"title-text"},this.title()))),v.a.createElement("div",{className:"resync-button",title:"Refresh blockstack data"},v.a.createElement(y.a,{onClick:this.sync,style:n?{animation:"spin 1.5s linear infinite"}:{}})),v.a.createElement("div",{className:"refresh-button",title:"Update the feeds"},v.a.createElement(g.a,{onClick:this.refresh}))),v.a.createElement("div",{className:"main"},this.inner()),v.a.createElement(M,Object.assign({},this.state,{openEpisode:this.openViewing,audioPlayer:this.audioPlayer}))))}},{key:"handleKey",value:function(e){var t=this.state.settings,a=t.toggle,n=t.seekBackwards,i=t.seekForwards,r=t.seekAmount;e===a&&this.audioPlayer.toggle(),e===n&&this.audioPlayer.seekRelative(-r),e===i&&this.audioPlayer.seekRelative(+r)}},{key:"updateSettings",value:function(e,t){var a=this;this.setState({settings:h()(this.state.settings,{$merge:e})},(function(){return t?a.saveSettings():null}))}},{key:"title",value:function(){var e=this.state,t=e.view,a=e.viewing,n=e.feeds;return t===_.Feeds?"Podcasts":t===_.Settings?"Settings":t===_.Search?"Search":t===_.Viewing?"string"===typeof a?n[a].data.meta.title:"undefined"!==typeof a?a.episode.title:(console.error("View set to viewing but this.state.viewing is undefined"),""):(console.log("View ".concat(t," not handled in title()")),"")}},{key:"inner",value:function(){var e=this.state,t=e.feeds,a=e.view,n=e.viewing,i=e.settings;if(a===_.Feeds)return v.a.createElement(re,{feeds:t,openFeed:this.openViewing,addFeed:this.addFeed,deleteFeed:this.deleteFeed});if(a===_.Settings)return v.a.createElement(ve,{settings:i,updateSettings:this.updateSettings});if(a===_.Viewing){if("string"===typeof n)return v.a.createElement(oe,{feeds:t,feedUrl:n,playEpisode:this.playEpisode,openEpisode:this.openViewing});if("undefined"!==typeof n)return v.a.createElement(G,Object.assign({epRef:n},this.state,{playEpisode:this.playEpisode,audioPlayer:this.audioPlayer}));var r="View set to viewing but this.state.viewing is undefined";return console.error(r),v.a.createElement("p",null,r)}if(a===_.Search)return v.a.createElement(de,{feeds:t,playEpisode:this.playEpisode,openEpisode:this.openViewing});var s="View ".concat(a," not handled in inner()");return console.error(s),v.a.createElement("p",null,s)}},{key:"playEpisode",value:function(e){this.audioPlayer.loadEp(e,this.state.feeds,!0,0)}},{key:"refresh",value:function(){var e=Object(s.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(Object.keys(this.state.feeds).map(this.addFeed));case 2:this.saveFeeds();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"deleteFeed",value:function(e){var t=h()(this.state.feeds,{$unset:[e]});this.setState({feeds:t},this.saveFeeds)}},{key:"addFeed",value:function(){var e=Object(s.a)(r.a.mark((function e(t){var a,i,s,l,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.state,i=a.settings,s=a.feeds,e.next=3,w(i.corsProxy,t);case 3:l=e.sent,o=h()(s,{$merge:Object(n.a)({},t,{time:Date.now(),data:l})}),this.setState({feeds:o},this.saveFeeds);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"saveFeeds",value:function(){var e=this.props.userSession;e&&j(e,"feeds.json",this.state.feeds)}},{key:"saveSettings",value:function(){var e=this.props.userSession;e&&j(e,"settings.json",this.state.settings)}},{key:"savePlaying",value:function(e){var t=this.props.userSession;t&&j(t,"playing.json",e)}},{key:"sync",value:function(){var e=this,t=this.props.userSession;t&&(C(t,"settings.json").then((function(t){return e.setState({settings:h()(e.state.settings,{$merge:t})})})),this.syncFeeds())}},{key:"syncFeeds",value:function(){var e=Object(s.a)(r.a.mark((function e(){var t,a,n,i,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.props.userSession){e.next=3;break}return e.abrupt("return");case 3:return this.setState({loading:!0}),a=C(t,"feeds.json"),n=C(t,"playing.json"),e.next=8,a;case 8:return i=e.sent,e.next=11,this.setState({feeds:i});case 11:return e.next=13,n;case 13:(s=e.sent)&&this.audioPlayer.loadEp(s.epRef,i,!1,s.time),this.setState({loading:!1});case 16:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.sync()}}]),t}(f.Component)}}]);
//# sourceMappingURL=6.8bc9f456.chunk.js.map