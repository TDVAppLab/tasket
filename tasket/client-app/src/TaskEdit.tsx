interface Props {
    id_task: string
}


export const TaskEdit = ({id_task}: Props) => {    
    

    return (
        <div>
            <h3>Task Detail</h3>
            <p>{id_task} : selected</p>
        </div>
    )
}