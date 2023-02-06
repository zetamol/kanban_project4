export default function reducer(state,action){
    let result
    switch (action.type){
        case 'add':            
        result = state.map(todo => {               
            if (todo.title === action.payload.target) {
                 todo.issues.push({
                     'id': Date.now(),
                     'name': `${action.payload.name}`,
                     'description': `${action.payload.description}`
                 })
            }
            return todo
        })
        return result

        case 'move':
            let todoItem
            result = state.map(todo => {               
                if (todo.title === action.payload.source) {
                    todoItem = todo.issues.filter(issue => issue.id===parseInt(action.payload.id,10))
                    todo.issues = todo.issues.filter(issue => issue.id!==parseInt(action.payload.id,10))                 
                }
                if (todo.title === action.payload.target && todoItem[0]) {
                    todo.issues.push(todoItem[0])
                }

                return todo
            })            
            return result

        case 'remove':
        result = state.map(todo => {               
            if (todo.title === action.payload.attr) {
                todo.issues = todo.issues.filter(issue => issue.id!==parseInt(action.payload.id,10))                
            }
            return todo
          })
  
           return result

        default:
           return state
    }
}