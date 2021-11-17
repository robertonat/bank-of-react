import {Link} from 'react-router-dom';



const Credits = (props) => {
	document.title = "Credits"
	let creditsView = () => {
        const { credits } = props;
        return credits.map((credit) => {
            let date = credit.date.slice(0,10);
            return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
        })
    }
    return (

    	<div>
    	   <h1>Credits</h1>
    	   {creditsView()}
           <form onSubmit={props.addCredit}>
             <input type="text" name="description" />
             <input type="number" name="amount" step=".01" />
             <button type="submit">Add Credit</button>

           </form>
					 <Link to="/">Return to Home</Link>
					 <h3>Balance:{Math.round(props.accountBalance*100)/100}</h3>
    	</div>

    )
}
export default Credits;
