import{C as J,F as R,Ha as ie,J as W,Q as U,S as z,T as $,X as I,Y as q,Z as X,a as T,b as A,ha as oe,ia as K,j as P,ja as Q,la as Z,ma as ee,na as te,t as Y,u as D,w as H}from"./chunk-PP2SF3VY.js";import{$a as f,$b as w,Cb as s,Db as a,Eb as _,Fa as G,Ib as b,Lb as g,Nb as d,Ub as F,Vb as l,Vc as M,Wb as B,Wc as L,Xb as j,Zb as y,_a as p,_b as S,ca as N,f as ae,ha as O,m as V,na as x,qb as C,sb as c,wa as m,xa as u}from"./chunk-OZJFN6VX.js";function me(i,r){if(i&1){let n=b();s(0,"div")(1,"div",3)(2,"p"),l(3,"Nothing to Show "),a(),s(4,"button",4),g("click",function(){m(n);let e=d(2);return u(e.onHome())}),l(5,"Add Expense"),a(),_(6,"img",5),a()()}}function ue(i,r){if(i&1&&(s(0,"div",6),_(1,"canvas",7),a()),i&2){let n=d(2);p(),c("type","pie")("datasets",n.pieChartDatasets)("labels",n.pieChartLabels)("options",n.pieChartOptions)("plugins",n.pieChartPlugins)("legend",n.pieChartLegend)}}function de(i,r){if(i&1&&(s(0,"div")(1,"div")(2,"p",1),l(3,"Click on Category for more details"),a()(),C(4,me,7,0,"div",0)(5,ue,2,6,"div",2),a()),i&2){let n=d();p(4),c("ngIf",n.pieChartLabels.length===0&&n.chartType==="pie"),p(),c("ngIf",n.pieChartLabels.length>0)}}function he(i,r){if(i&1&&(s(0,"mat-option",13),l(1),a()),i&2){let n=r.$implicit;c("value",n),p(),B(n)}}function ge(i,r){i&1&&(s(0,"div")(1,"div",3)(2,"p"),l(3,"Select Year for "),s(4,"b"),l(5,"Monthly"),a(),l(6," details. "),a(),_(7,"img",14),a()())}function fe(i,r){if(i&1&&(s(0,"div",15),_(1,"canvas",16),a()),i&2){let n=d(2);p(),c("data",n.barChartData)("options",n.barChartOptions)("plugins",n.barChartPlugins)("legend",n.barChartLegend)("type","bar")}}function Ce(i,r){if(i&1){let n=b();s(0,"div")(1,"div")(2,"p",1),l(3,"Click on "),s(4,"b"),l(5,"Bars"),a(),l(6," for more details"),a()(),s(7,"div",8)(8,"mat-form-field",9)(9,"mat-label"),l(10,"Select Year"),a(),s(11,"mat-select",10),w("valueChange",function(e){m(n);let o=d();return S(o.selectedYear,e)||(o.selectedYear=e),u(e)}),g("selectionChange",function(e){m(n);let o=d();return u(o.onSelectionChange(e))}),C(12,he,2,2,"mat-option",11),a()()(),C(13,ge,8,0,"div",0)(14,fe,2,5,"div",12),a()}if(i&2){let n=d();p(11),y("value",n.selectedYear),p(),c("ngForOf",n.years),p(),c("ngIf",n.selectedYear===""&&n.chartType==="bar"),p(),c("ngIf",n.selectedYear!=="")}}var Me=(()=>{let r=class r{constructor(t,e,o){this.dialog=t,this.businessData=e,this.route=o,this.chartType=[],this.pieChartLabels=[],this.pieValues=[],this.years=[],this.selectedYear="",this.allMonths=[],this.barChartData={labels:[],datasets:[]},this.pieChartLegend=!0,this.pieChartPlugins=[],this.barChartLegend=!0,this.barChartPlugins=[],this.barChartOptions={responsive:!0},this.pieChartOptions={responsive:!0}}onHome(){this.businessData.pieDialogRef.close(),this.businessData.onHome()}ngOnInit(){this.chartType=this.businessData.chartType,this.pieChartLabels=this.businessData.pieLabels,this.pieChartDatasets=[{data:this.businessData.piedata}],this.years=[];for(let t in this.businessData.hashmap)this.years.push(t)}onSelectionChange(t){this.allMonths={Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0};let e=this.businessData.hashmap[t.value];for(let h of e)this.allMonths[h[0]]+=h[1];let o=[];for(let h in this.allMonths)o.push(this.allMonths[h]);this.barChartData={labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{data:o,label:t.value}]}}};r.\u0275fac=function(e){return new(e||r)(f(Q),f(U),f(P))},r.\u0275cmp=x({type:r,selectors:[["app-show-chart"]],decls:2,vars:2,consts:[[4,"ngIf"],[1,"categorypara"],["class","pieChart",4,"ngIf"],[2,"display","flex","justify-content","center","align-items","center","flex-direction","column"],["mat-raised-button","",2,"margin-bottom","10px",3,"click"],["src","../../../assets/image/pie22.gif","height","200px","width","200px"],[1,"pieChart"],["baseChart","","id","myCanvas",3,"type","datasets","labels","options","plugins","legend"],[2,"display","flex","justify-content","center"],["appearance","outline"],[3,"valueChange","selectionChange","value"],[3,"value",4,"ngFor","ngForOf"],["class","barChart",4,"ngIf"],[3,"value"],["src","../../../assets/image/nobar.gif","height","220px","width","300px"],[1,"barChart"],["id","myBarCanvas","baseChart","",3,"data","options","plugins","legend","type"]],template:function(e,o){e&1&&C(0,de,6,2,"div",0)(1,Ce,15,4,"div",0),e&2&&(c("ngIf",o.chartType==="pie"),p(),c("ngIf",o.chartType==="bar"))},dependencies:[M,L,D,I,$,X,Y,ie],styles:[".pieChart[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:300px;margin-top:30px}.barChart[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:300px;margin-top:10px}#myCanvas[_ngcontent-%COMP%]{width:300px!important;height:300px!important}.categorypara[_ngcontent-%COMP%]{font-size:15px;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;padding-top:10px;padding-left:10px}"]});let i=r;return i})();var re=(()=>{let r=class r{constructor(t){this.http=t,this.baseUrl="http://localhost:2000/group",this.groupNameSubject=new V("")}createGroup(t){let e=sessionStorage.getItem("LEAD_ID"),o=new T().set("Authorization",`Bearer ${e}`);return console.log("Token : == "+e),this.http.post(`${this.baseUrl}/creategroup`,t,{headers:o})}getAllGroupsByUserId(){let t=sessionStorage.getItem("LEAD_ID"),e=new T().set("Authorization",`Bearer ${t}`);return this.http.get(`${this.baseUrl}/getallgroups`,{headers:e})}setGroupName(t){this.groupNameSubject.next(t)}getGroupName(){return this.groupNameSubject.asObservable()}SuggestionsByGemini(t){let e={contents:[{parts:[{text:t}]}]};return this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDlcEEhXCJANNpHsm3nkkLpC98rml6-oRo",e)}};r.\u0275fac=function(e){return new(e||r)(O(A))},r.\u0275prov=N({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();var k=ae(oe());function ve(i,r){if(i&1){let n=b();s(0,"li"),l(1),s(2,"button",11),g("click",function(){let e=m(n).index,o=d();return u(o.removeMember(e))}),s(3,"mat-icon"),l(4,"delete"),a()()()}if(i&2){let n=r.$implicit;p(),j("",n," ")}}var Be=(()=>{let r=class r{constructor(t,e){this.dialogRef=t,this.groupService=e,this.groupName="",this.groupMembers=[],this.groupCreated=new G}addMember(t){t.trim()!==""&&this.groupMembers.push(t.trim())}removeMember(t){this.groupMembers.splice(t,1)}createGroup(){let t={name:this.groupName,members:this.groupMembers,expenses:[]};this.groupService.createGroup(t).subscribe({next:e=>{k.default.fire({title:"Group created successfully:",icon:"success",showConfirmButton:!1,timer:2e3}),console.log("Group created successfully:",e),document.location.reload()},error:e=>{k.default.fire({icon:"error",title:"Oops...",text:"Enter Group Details",showConfirmButton:!1,timer:2e3}),console.error("Error creating group:",e)}}),this.dialogRef.close()}closeDialog(){this.dialogRef.close()}};r.\u0275fac=function(e){return new(e||r)(f(K),f(re))},r.\u0275cmp=x({type:r,selectors:[["app-create-group-dialog"]],outputs:{groupCreated:"groupCreated"},decls:17,vars:2,consts:[["memberInput",""],["mat-dialog-title",""],["mat-dialog-content",""],["matInput","","placeholder","Group Name",3,"ngModelChange","ngModel"],[2,"padding-left","10px"],["matInput","","placeholder","Member Email"],["mat-button","",3,"click"],[4,"ngFor","ngForOf"],["mat-dialog-actions",""],["mat-button","",2,"border","2px solid red",3,"click"],["mat-button","","cdkFocusInitial","",2,"border","2px solid green",3,"click"],["mat-icon-button","",3,"click"]],template:function(e,o){if(e&1){let h=b();s(0,"h2",1),l(1,"Create Group"),a(),s(2,"div",2)(3,"mat-form-field")(4,"input",3),w("ngModelChange",function(v){return m(h),S(o.groupName,v)||(o.groupName=v),u(v)}),a()(),s(5,"mat-form-field",4),_(6,"input",5,0),s(8,"button",6),g("click",function(){m(h);let v=F(7);return o.addMember(v.value),u(v.value="")}),l(9,"Add Member Email"),a()(),s(10,"ul"),C(11,ve,5,1,"li",7),a()(),s(12,"div",8)(13,"button",9),g("click",function(){return m(h),u(o.closeDialog())}),l(14,"Cancel"),a(),s(15,"button",10),g("click",function(){return m(h),u(o.createGroup())}),l(16,"Create"),a()()}e&2&&(p(4),y("ngModel",o.groupName),p(7),c("ngForOf",o.groupMembers))},dependencies:[M,D,H,z,q,I,Z,te,ee,J,R,W]});let i=r;return i})();export{Me as a,re as b,Be as c};
