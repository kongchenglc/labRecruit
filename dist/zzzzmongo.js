const Koa = require('koa');
const monk = require('monk');
const url = 'localhost:27017/labRecruit';

const db = monk(url);
const studentArray = [
	{
		sNumber: '04151092',
		sName: "李诚",
		sClass: "计科1503",
		sSubject: "web前端",
		sPhone: "18829211951"
	},
	{
		sNumber: '04151000',
		sName: "小王",
		sClass: "网络1234",
		sSubject: "嵌入式",
		sPhone: "11011001100"
	}
];

//删除
// db.get('student').drop();
//简单插入
// db.get('student').insert(studentArray);
//查找替换
// db.get('student').update({"asdf":"asdf"},{"$set":{asdf:2,age:21}});


// // student 替换
data = { sNumber: '04151092', another: 'asdfsdfaasdf'}
db  .get('student')
	.update({ 'sNumber': data.sNumber }, { "$set": data })
	.then(mes => {
		console.log(mes);
	})
	.catch(err => {
		console.log('err:');
		console.log(err);
	})

// // student 查找
// db.get('student').find({sNumber: data.sNumber}).then(data=>{
// 	console.log(data);
// 	if(data[0]){
// 		console.log('asdf')
// 	}
// });


// admin 插入
// const adminArray = [
// 	{
// 		aNumber: '04151092',
// 		aPassword: '12138',
// 	},
// 	{
// 		aNumber: '04163221',
// 		aPassword: '12138',
// 	},
// ]
// db.get('admin').insert(adminArray);

// const string = '510';
// db.get('admin').find({$or: [{aNumber: new RegExp(`.*${string}.*`)}]}).then(result => {
// 	console.log(result);
// })

// // admin 查找
// db.get('admin').find().then(data => {
// 	console.log(data);
// 	db.close();
// })







// 简单查找
// db.get('student').find().then(data=>{
// 	console.log(data);
// 	db.close();
// }).catch(err => {
// 	console.log(err);
// })


//查找学号
// db.get('student').find({sNumber: '04151092'}).then(data=>{
// 	console.log(data);
// 	db.close();
// })