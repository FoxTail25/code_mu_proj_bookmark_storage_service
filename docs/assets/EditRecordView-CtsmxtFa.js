import{c as d,a as n,b as e,P as c,w as a,d as h,F as p,r as k,v as m,t as b,u as g,o as l,e as f}from"./index-D4AnJgK-.js";import{I as v,a as L,E as w,S as _}from"./SaveText-CWAYurDN.js";const y={class:"row justify-content-center mb-4"},R={class:"mt-2"},T={class:"row justify-content-center"},N={class:"col-10 mb-2"},O=["value"],E={key:0,class:"mt-2"},G={class:"row justify-content-center"},U={class:"list-group list-group-numbered col-12 col-md-10 col-md-10 col-lg-8 mb-4"},D={class:"row w-100"},C={class:"col-12 d-flex align-items-center justify-content-between"},j=["onClick","disabled"],A=["onClick","disabled"],F={class:"f1"},V=["onClick"],S=["onClick"],M={key:0,class:"row g-1 justify-content-center"},$={class:"input-group mb-1"},I={class:"col-12 mb-2"},P={for:"inputLink",class:"row g-1"},B={class:"col-9 col-sm-10 col-md-10"},H={class:"col-12 mb-2"},q={class:"row g-1",for:"inputName"},z={class:"col-9 col-sm-10 col-md-10"},J={class:"col-12 mb-2"},K={class:"row g-1",for:"inputDescription"},Q={class:"col-9 col-sm-10 col-md-10"},W={class:"row g-1 justify-content-center"},X={class:"input-group mb-1 justify-content-center"},Y={class:"col-12 col-sm-10 mb-2"},Z={for:"inputLink",class:"row g-1"},x={class:"col-9 col-sm-10 col-md-11"},ee={class:"col-12 col-sm-10 mb-2"},te={class:"row g-1",for:"inputName"},oe={class:"col-9 col-sm-10 col-md-11"},se={class:"col-12 col-sm-10 mb-2"},ie={class:"row g-1",for:"inputDescription"},de={class:"col-9 col-sm-10 col-md-11"},le={class:"col-10 text-center mb-4"},ne={class:"mt-2"},re={class:"row justify-content-center"},ae={class:"col-10 mb-2"},ce=["value"],me={key:1,class:"mt-2 text-center"},ue={type:"button",class:"btn btn-primary d-none","data-bs-toggle":"modal","data-bs-target":"#warningModal",ref:"modal"},pe={class:"modal fade",id:"warningModal",tabindex:"-1","aria-labelledby":"warningModalLabel","aria-hidden":"true"},be={class:"modal-dialog modal-dialog-centered"},ke={class:"modal-content"},he={class:"modal-body",ref:"modalText"};let u;const ge={data(){return{bookmarkArr:[],selectedToEdit:"Выберите имя группы",selectedToDelete:"Выберите имя записи",editNewLinkRecord:{link:"",name:"",description:""},editOldLinkRecord:{link:"",name:"",description:""}}},methods:{changeOrder(i,t){u.changeRecordOrder(this.selectedToEdit,i,t)},checkUp(i){return i==0},checkDown(i){return i==this.getSelectedGroupRecord.length-1},addNewLinkInGroup(){let i=!1;for(let t in this.editNewLinkRecord)if(!this._checkText(this.editNewLinkRecord[t])){i=t;break}if(!i)console.log("!все поля заполнены!"),u.addNewLinkRecord(this.selectedToEdit,this.editNewLinkRecord),this.editNewLinkRecord={link:"",name:"",description:""};else{let t;switch(i){case"link":t="Link";break;case"name":t="Имя";break;case"description":t="Title";break}this.$refs.modalText.innerHTML=`<span class="fst-italic">поле </span>
				<span class="fw-medium fst-normal">${t}</span>
				 <span class="text-danger">не заполнено!</span>`,this.$refs.modal.click()}},editLinkRecordFromGroup(i){let o=this.bookmarkArr.filter(s=>s.id==this.selectedToEdit)[0].bookmarksList.filter(s=>s.id==i)[0];this.editOldLinkRecord={name:o.name,description:o.description,link:o.link},o.edit=!0},saveLinkRecordFromGroup(i){let o=this.bookmarkArr.filter(s=>s.id==this.selectedToEdit)[0].bookmarksList.filter(s=>s.id==i)[0];u.changeRecordData(this.selectedToEdit,i,{...this.editOldLinkRecord}),o.edit=!1},deleteLinkFromGroup(){u.deleteLinkFromGroup(this.selectedToEdit,this.selectedToDelete)},_checkText(i){return i.trim().length>0}},computed:{sorted(){return this.bookmarkArr.sort((i,t)=>i.section_order-t.section_order),console.log(this.bookmarkArr),this.bookmarkArr},group_selected(){return this.selectedToEdit!="Выберите имя группы"},getSelectedGroupRecord(){if(this.selectedToEdit=="Выберите имя группы")return this.selectedToEdit;{let i=this.bookmarkArr.filter(t=>t.id==this.selectedToEdit)[0];return i.bookmarksList.sort((t,o)=>t.linkOrder-o.linkOrder),i.bookmarksList}}},created(){u=g(),this.bookmarkArr=u.bookmarkArr}},Le=Object.assign(ge,{__name:"EditRecordView",setup(i){return(t,o)=>(l(),d(p,null,[n(c,{msg:"Редактирование записей в группе"}),n(c,{msg:"(Из выпадающего списка выберите группу для редактирования)",num:6,tagName:"P"}),e("div",y,[e("div",R,[e("div",T,[e("div",N,[a(e("select",{class:"form-select","aria-label":"Default select example","onUpdate:modelValue":o[0]||(o[0]=s=>t.selectedToEdit=s)},[o[10]||(o[10]=e("option",null,"Выберите имя группы",-1)),(l(!0),d(p,null,k(t.bookmarkArr,s=>(l(),d("option",{value:s.id,key:s.id},b(s.section_name),9,O))),128))],512),[[h,t.selectedToEdit]])])])]),t.group_selected?(l(),d("div",E,[e("div",G,[e("ol",U,[(l(!0),d(p,null,k(t.getSelectedGroupRecord,s=>(l(),d("li",{key:s.id,class:"list-group-item d-flex"},[e("div",D,[e("div",C,[e("span",null,[e("button",{class:"btn btn-primary p-1 m-1 lh-1",onClick:r=>t.changeOrder(s.id,"up"),disabled:t.checkUp(s.linkOrder),title:"Переместить группу вверх"},[n(v)],8,j),e("button",{class:"btn btn-primary p-1 m-1 lh-1",onClick:r=>t.changeOrder(s.id,"down"),disabled:t.checkDown(s.linkOrder),title:"Переместить группу вниз"},[n(L)],8,A)]),e("span",F,b(s.name),1),s.edit?(l(),d("button",{key:1,class:"btn btn-primary p-1 m-1 lh-1",onClick:r=>t.saveLinkRecordFromGroup(s.id),title:"сохранить запись"},[n(_)],8,S)):(l(),d("button",{key:0,class:"btn btn-primary p-1 m-1 lh-1",onClick:r=>t.editLinkRecordFromGroup(s.id),title:"Отредактировать запись"},[n(w)],8,V))]),s.edit?(l(),d("div",M,[e("div",$,[e("div",I,[e("label",P,[o[11]||(o[11]=e("div",{class:"col-3 col-sm-2 col-md-2"},[e("span",{class:"input-group-text",id:"basic-addon1"},"Link")],-1)),e("div",B,[a(e("input",{type:"text",class:"form-control",placeholder:"Адрес ссылки","aria-label":"Username","aria-describedby":"basic-addon1",id:"inputLink","onUpdate:modelValue":o[1]||(o[1]=r=>t.editOldLinkRecord.link=r)},null,512),[[m,t.editOldLinkRecord.link]])])])]),e("div",H,[e("label",q,[o[12]||(o[12]=e("div",{class:"col-3 col-sm-2 col-md-2"},[e("span",{class:"input-group-text",id:"basic-addon2"},"Имя")],-1)),e("div",z,[a(e("input",{type:"text",class:"form-control",placeholder:"Отображаемое название","aria-label":"Username","aria-describedby":"basic-addon2",id:"inputName","onUpdate:modelValue":o[2]||(o[2]=r=>t.editOldLinkRecord.name=r)},null,512),[[m,t.editOldLinkRecord.name]])])])]),e("div",J,[e("label",K,[o[13]||(o[13]=e("div",{class:"col-3 col-sm-2 col-md-2"},[e("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1)),e("div",Q,[a(e("input",{type:"text",class:"form-control",placeholder:"Описание","aria-label":"Username","aria-describedby":"basic-addon3",id:"inputDescription","onUpdate:modelValue":o[3]||(o[3]=r=>t.editOldLinkRecord.description=r)},null,512),[[m,t.editOldLinkRecord.description]])])])])])])):f("",!0)])]))),128))]),n(c,{msg:"Добавить новую запись в группу"}),n(c,{msg:"(Заполните обязательные поля и нажмите «Добавить запись в группу»)",num:6,tagName:"P"}),e("div",W,[e("div",X,[e("div",Y,[e("label",Z,[o[14]||(o[14]=e("div",{class:"col-3 col-sm-2 col-md-1"},[e("span",{class:"input-group-text",id:"basic-addon1"},"Link")],-1)),e("div",x,[a(e("input",{type:"text",class:"form-control",placeholder:"Адрес ссылки","aria-label":"Username","aria-describedby":"basic-addon1",id:"inputLink","onUpdate:modelValue":o[4]||(o[4]=s=>t.editNewLinkRecord.link=s)},null,512),[[m,t.editNewLinkRecord.link]])])])]),e("div",ee,[e("label",te,[o[15]||(o[15]=e("div",{class:"col-3 col-sm-2 col-md-1"},[e("span",{class:"input-group-text",id:"basic-addon2"},"Имя")],-1)),e("div",oe,[a(e("input",{type:"text",class:"form-control",placeholder:"Отображаемое название","aria-label":"Username","aria-describedby":"basic-addon2",id:"inputName","onUpdate:modelValue":o[5]||(o[5]=s=>t.editNewLinkRecord.name=s)},null,512),[[m,t.editNewLinkRecord.name]])])])]),e("div",se,[e("label",ie,[o[16]||(o[16]=e("div",{class:"col-3 col-sm-2 col-md-1"},[e("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1)),e("div",de,[a(e("input",{type:"text",class:"form-control",placeholder:"Описание","aria-label":"Username","aria-describedby":"basic-addon3",id:"inputDescription","onUpdate:modelValue":o[6]||(o[6]=s=>t.editNewLinkRecord.description=s)},null,512),[[m,t.editNewLinkRecord.description]])])])])]),e("div",le,[e("button",{class:"btn btn-success",onClick:o[7]||(o[7]=(...s)=>t.addNewLinkInGroup&&t.addNewLinkInGroup(...s))},"Добавить ссылку в группу")])]),n(c,{msg:"Удаление записи из группы"}),n(c,{msg:"(выберите запись	из выпадающего списка и нажмите «Удалить запись»)",num:6,tagName:"P"}),e("div",ne,[e("div",re,[e("div",ae,[a(e("select",{class:"form-select","aria-label":"Default select","onUpdate:modelValue":o[8]||(o[8]=s=>t.selectedToDelete=s)},[o[17]||(o[17]=e("option",null,"Выберите имя записи",-1)),(l(!0),d(p,null,k(t.getSelectedGroupRecord,s=>(l(),d("option",{value:s.id,key:s.id},b(s.name),9,ce))),128))],512),[[h,t.selectedToDelete]])]),e("button",{class:"btn btn-danger col-10 col-sm-6 col-md-4 mb-2",onClick:o[9]||(o[9]=(...s)=>t.deleteLinkFromGroup&&t.deleteLinkFromGroup(...s))},"Удалить запись")])])])])):(l(),d("div",me,"Группа не выбрана, "+b(t.getSelectedGroupRecord.toLowerCase()),1))]),e("button",ue," Launch demo modal ",512),e("div",pe,[e("div",be,[e("div",ke,[o[18]||(o[18]=e("div",{class:"modal-header"},[e("h1",{class:"modal-title fs-5",id:"warningModalLabel"},"Не все поля заполнены"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),e("div",he," ... ",512),o[19]||(o[19]=e("div",{class:"modal-footer"},[e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close")],-1))])])])],64))}});export{Le as default};
