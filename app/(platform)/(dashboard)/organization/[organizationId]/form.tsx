import { useAction } from "@/hooks/use-actions"
import FormInput from "./form-input"
import { createBoard } from "@/actions/create-board"



export  const Form=()=>{

    const {execute,fieldErrors}=useAction(createBoard,{
        onSuccess:(data)=>{
            console.log(data,"SUCCESS");
        },
        onError:(error)=>{
            console.log(error,"ERROR");
        }
        ,onComplete
    })


    const onSubmit=(formdate:FormData)=>{
        const title=formdate.get('title') as string
        execute({title})
    }
     return(
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={fieldErrors}/>
            </div>

        </form>
    )
}