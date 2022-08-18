// import {v4} from "uuid";
//
// const item = {
//     id: v4(),
//     name:'Create tenant',
// }
// const item2 = {
//     id: v4(),
//     name:'Create popup'
// }
// const item3 = {
//     id: v4(),
//     name:'Create slider'
// }
//
// const [state,setState] = useState({
//     "todo":{
//         title:'Not Started',
//         items:[item]
//     },
//     "in-progress":{
//         title:'In Development',
//         items:[item2]
//     },
//     "done":{
//         title:'Completed',
//         items:[item3],
//     },
// })


// const getTaskList = async () => {
//     console.log('here',state)
//     const resp = await fetch('https://todo-list-c67a5-default-rtdb.firebaseio.com/taskList.json',{
//         method:'POST',
//         body:JSON.stringify(state),
//         headers: {
//             'Content-Type':'application/json'
//         }
//     })
//     const data = await resp.json()
//     console.log('data',data)
// }