(this["webpackJsonpgame-of-life-react"]=this["webpackJsonpgame-of-life-react"]||[]).push([[0],{222:function(e,t,a){e.exports=a(393)},227:function(e,t,a){},229:function(e,t,a){},234:function(e,t,a){},235:function(e,t,a){},236:function(e,t,a){},393:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(26),l=a.n(s),i=(a(227),a(228),a(17)),o=a(18),c=a(20),u=a(19),p=(a(229),a(403)),d=a(47),h=a(404),m=a(197),g=(a(234),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleMouseEnter=function(e){n.setState({shadowLocation:e})},n.state={shadowLocation:"0_0"},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=null;if(this.props.grid){var a=this.props.grid.map((function(e){return e.slice()}));if(this.props.shadowGrid)for(var n=parseInt(this.state.shadowLocation.substring(0,this.state.shadowLocation.indexOf("_"))),s=parseInt(this.state.shadowLocation.substring(this.state.shadowLocation.indexOf("_")+1)),l=0;l<this.props.shadowGrid.length;l++)for(var i=0;i<this.props.shadowGrid[0].length;i++)n+l<this.props.grid.length&&s+i<this.props.grid[0].length&&(a[n+l][s+i]=this.props.shadowGrid[l][i]);t=a.map((function(t,a){return r.a.createElement("tr",{key:a},t.map((function(t,n){return r.a.createElement(f,{interactive:e.props.interactive,cellSize:e.props.cellSize,boxId:a+"_"+n,key:a+"_"+n,populated:t,cellColor:e.props.cellColor,toggleCellFunc:e.props.toggleCellFunc,onMouseEnter:e.handleMouseEnter})})))}))}return r.a.createElement("table",{className:"grid"},r.a.createElement("tbody",null,t))}}]),a}(r.a.Component)),f=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t={backgroundColor:this.props.populated?this.props.cellColor:void 0,height:this.props.cellSize?this.props.cellSize:"20px",width:this.props.cellSize?this.props.cellSize:"20px"};return r.a.createElement("td",{style:t,className:this.props.interactive?"interactive cell":"cell",onClick:function(){e.props.interactive&&e.props.toggleCellFunc(e.props.boxId)},onMouseEnter:function(){return e.props.onMouseEnter(e.props.boxId)}})}}]),a}(r.a.Component),v=g,E=(a(235),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleClick=function(){e.props.onChange?e.props.onChange(e.props.value):e.props.onClick&&e.props.onClick(e.props.value)},e}return Object(o.a)(a,[{key:"render",value:function(){var e,t,a="imageRadio";return this.props.large?a+=" large":this.props.medium?a+=" medium":this.props.small&&(a+=" small"),this.props.imgSrc?e=r.a.createElement("img",{className:"imageRadioContent",src:this.props.imgSrc,alt:this.props.altText}):this.props.solidColor&&(e=r.a.createElement("div",{className:"imageRadioContent",style:{backgroundColor:this.props.solidColor}})),this.props.label&&(t=r.a.createElement("p",null,this.props.label)),r.a.createElement("div",{className:"imageRadioWrapper"},r.a.createElement("input",{type:"radio",checked:this.props.checked,name:this.props.name,value:this.props.value,onClick:this.handleClick}),r.a.createElement("div",{className:a},e,t))}}]),a}(r.a.Component)),S=a(406),b=(a(236),[{name:"Blinker",dimensions:[3,3],type:"oscillator",period:2,grid:[[0,0,0],[1,1,1],[0,0,0]]},{name:"Toad",dimensions:[4,4],type:"oscillator",period:2,grid:[[0,0,0,0],[0,1,1,1],[1,1,1,0],[0,0,0,0]]},{name:"Beacon",dimensions:[4,4],type:"oscillator",period:2,grid:[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]},{name:"Pulsar",dimensions:[15,15],type:"oscillator",period:3,grid:[[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],[0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],[0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],[1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0]]},{name:"Pentadecathlon",dimensions:[9,16],type:"oscillator",period:15,grid:[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,1,0,1,0,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,0,0,1,0,0],[0,0,0,1,0,1,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]},{name:"Glider",dimensions:[3,3],type:"spaceship",grid:[[0,0,1],[1,0,1],[0,1,1]]},{name:"Medium Spaceship",dimensions:[5,4],type:"spaceship",grid:[[1,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]]}]);b.forEach((function(e){e.grid.forEach((function(e){e.unshift(!1),e.push(!1)}));var t=new Array(e.grid[0].length).fill(!1);e.grid.unshift(t),e.grid.push(t)}));var y=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).selectItem=function(e){n.setState({selected:e,detailsOpen:!0,selectedGrid:b[e].grid,generation:0})},n.nextGen=function(){n.setState({selectedGrid:n.props.stepFunc(n.state.selectedGrid),generation:(n.state.generation+1)%b[n.state.selected].period})},n.state={selected:0,detailsOpen:!1,selectedGrid:b[0].grid,generation:0},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=b.map((function(t,a){return r.a.createElement(C,{key:a,i:a,structure:t,stepFunc:e.props.stepFunc,selectItemFunc:e.selectItem})}));return r.a.createElement(h.a,{closeIcon:!0,onClose:this.props.closeFunc,open:this.props.open},r.a.createElement(h.a.Header,null,"Structures"),r.a.createElement(h.a.Content,null,r.a.createElement("div",{id:"modal-content"},r.a.createElement("div",{id:"structure-list",className:this.state.detailsOpen?null:"visible"},t),r.a.createElement("div",{id:"structure-details",className:this.state.detailsOpen?"visible":null},r.a.createElement("div",null,r.a.createElement("h3",null,b[this.state.selected].name),r.a.createElement("p",null,"Dimensions: ",b[this.state.selected].dimensions[0],"x",b[this.state.selected].dimensions[1]),r.a.createElement("p",null,"Period: ",b[this.state.selected].period),r.a.createElement("p",null,"Type: ",b[this.state.selected].type),r.a.createElement(p.a,{icon:!0,labelPosition:"left",onClick:function(){return e.props.placeStructFunc(e.state.selectedGrid)},disabled:!0},"Place this structure!",r.a.createElement(d.a,{name:"paint brush"})),r.a.createElement(p.a,{className:"back-button",onClick:function(){return e.setState({detailsOpen:!1})}},"Back")),r.a.createElement("div",{id:"structure-grid"},r.a.createElement(v,{grid:this.state.selectedGrid,cellColor:"#616161"}),r.a.createElement("p",null,"Generation ",this.state.generation),r.a.createElement(S.a,{content:"Animation for spaceships is currently unavailable",disabled:"spaceship"!==b[this.state.selected].type,trigger:r.a.createElement("span",null,r.a.createElement(p.a,{onClick:this.nextGen,disabled:"spaceship"===b[this.state.selected].type},"Step"))}))))))}}]),a}(r.a.Component),C=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).toggleHover=function(){n.setState({hover:!n.state.hover})},n.play=function(){n.state.hover&&"spaceship"!==n.props.structure.type&&n.setState({grid:n.props.stepFunc(n.state.grid)})},n.state={hover:!1,structure:n.props.structure,grid:n.props.structure.grid,timer:setInterval(n.play,1e3)},n}return Object(o.a)(a,[{key:"render",value:function(){var e,t=this,a=this.state.grid.length;return e=a<=5?"20px":a<=10?"17px":a<=15?"13px":"10px",r.a.createElement("div",{className:"structure-item",onMouseEnter:this.toggleHover,onMouseLeave:this.toggleHover,onClick:function(){return t.props.selectItemFunc(t.props.i)}},r.a.createElement("p",null,this.props.structure.name),r.a.createElement(v,{padded:!0,grid:this.state.grid,cellColor:"#616161",cellSize:e}))}}]),a}(r.a.Component),O=y,k=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(i.a)(this,a),(n=t.call(this,e)).toggleAutoPlay=function(){n.state.playing?clearInterval(n.timer):n.timer=setInterval(n.play,n.state.interval),n.setState({playing:!n.state.playing})},n.openSettingsModal=function(){n.setState({structureModalOpen:!0})},n.closeSettingsModal=function(){n.setState({structureModalOpen:!1})},n.openStructureMenu=function(){n.setState({structureMenuOpen:!0})},n.closeStructureMenu=function(){n.setState({structureMenuOpen:!1})},n.handleIntervalSliderChange=function(e){n.setState({interval:e})},n.handleColorChange=function(e){n.setState({color:e})},n.play=function(){var e=n.step(n.state.grid);n.setState({grid:e,generation:n.state.generation+1})},n.step=function(e){for(var t=e.map((function(e){return e.slice()})),a=0;a<e.length;a++)for(var r=0;r<e[0].length;r++){var s=n.nLiveNeighbours(a,r,e);n.cellIsPopulated(a,r,e)?(s<2||s>3)&&(t[a][r]=!1):3===s&&(t[a][r]=!0)}return t},n.nLiveNeighbours=function(e,t,a){var r=0;return n.cellIsPopulated(e-1,t-1,a)&&r++,n.cellIsPopulated(e-1,t,a)&&r++,n.cellIsPopulated(e-1,t+1,a)&&r++,n.cellIsPopulated(e,t-1,a)&&r++,n.cellIsPopulated(e,t+1,a)&&r++,n.cellIsPopulated(e+1,t-1,a)&&r++,n.cellIsPopulated(e+1,t,a)&&r++,n.cellIsPopulated(e+1,t+1,a)&&r++,r},n.cellIsPopulated=function(e,t,a){return e>=0&&t>=0&&e<a.length&&t<a[0].length&&a[e][t]},n.startPlaceStructure=function(e){n.setState({structureMenuOpen:!1,selectedStruct:e})},n.resetGrid=function(){var e=new Array(n.state.rows).fill().map((function(){return new Array(n.state.cols).fill(!1)}));n.setState({grid:e,generation:0})},n.randomSeedGrid=function(){for(var e=new Array(n.state.rows).fill().map((function(){return new Array(n.state.cols).fill(!1)})),t=0;t<n.state.rows;t++)for(var a=0;a<n.state.cols;a++)1===Math.floor(5*Math.random())&&(e[t][a]=!0);n.setState({grid:e,generation:0})},n.toggleCell=function(e){if(!n.state.playing){var t=(e=e.split("_"))[0],a=e[1],r=n.state.grid.slice();r[t][a]=!r[t][a],n.setState({grid:r})}};return n.timer=null,n.cellSize="20px",n.state={rows:28,cols:40,grid:new Array(28).fill().map((function(){return new Array(40).fill(!1)})),playing:!1,selectedStruct:null,interval:500,color:"#242424",generation:0,structureModalOpen:!1,structureMenuOpen:!1},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=[{name:"Black",hex:"#242424"},{name:"Red",hex:"#e60000"},{name:"Orange",hex:"#ebab34"},{name:"Yellow",hex:"#f0e446"},{name:"Green",hex:"#1dc223"},{name:"Blue",hex:"#1555c2"},{name:"Purple",hex:"#9715c2"},{name:"Pink",hex:"#f760e3"}].map((function(t,a){return r.a.createElement(E,{small:!0,name:"color",key:a,solidColor:t.hex,value:t.hex,label:t.name,onClick:e.handleColorChange,checked:t.hex===e.state.color})}));return r.a.createElement("div",{className:"app",onMouseMove:this.updateCursorXY},r.a.createElement("h1",null,"Game of Life"),r.a.createElement(v,{interactive:!this.state.selectedStruct,grid:this.state.grid,toggleCellFunc:this.toggleCell,cellColor:this.state.color,cellSize:this.cellSize,shadowGrid:this.state.selectedStruct}),r.a.createElement("p",null,"Generation: ",this.state.generation),r.a.createElement("div",{className:"button-container"},r.a.createElement(p.a,{primary:!0,icon:!0,onClick:this.toggleAutoPlay,disabled:this.state.selectedStruct},r.a.createElement(d.a,{name:this.state.playing?"pause":"play"})),r.a.createElement(p.a,{onClick:this.play,disabled:this.state.playing||this.state.selectedStruct},"Step"),r.a.createElement(p.a,{icon:!0,onClick:this.openStructureMenu,disabled:this.state.playing||this.state.selectedStruct},r.a.createElement(d.a,{name:"folder outline"})),r.a.createElement(p.a,{onClick:this.resetGrid,disabled:this.state.playing||this.state.selectedStruct},"Reset Grid"),r.a.createElement(p.a,{onClick:this.randomSeedGrid,disabled:this.state.playing||this.state.selectedStruct},"Seed"),r.a.createElement(p.a,{icon:!0,onClick:this.openSettingsModal,disabled:this.state.playing||this.state.selectedStruct},r.a.createElement(d.a,{name:"setting"}))),r.a.createElement(h.a,{closeIcon:!0,onClose:this.closeSettingsModal,open:this.state.structureModalOpen},r.a.createElement(h.a.Header,null,"Settings"),r.a.createElement(h.a.Content,null,r.a.createElement("label",null,"Play Speed"),r.a.createElement(m.Slider,{discrete:!0,color:"blue",settings:{start:1e3/this.state.interval,min:1,max:5,step:1,onChange:function(t){return e.handleIntervalSliderChange(1e3/t)}}}),r.a.createElement("label",null,"Color"),r.a.createElement("br",null),t)),r.a.createElement(O,{open:this.state.structureMenuOpen,stepFunc:this.step,closeFunc:this.closeStructureMenu,placeStructFunc:this.startPlaceStructure}))}}]),a}(r.a.Component);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root"))}},[[222,1,2]]]);
//# sourceMappingURL=main.4d5cc2d2.chunk.js.map