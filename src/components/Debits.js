import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
	document.title = "Debits"
	let debitsView = () => {
        const { debits } = props;
        return debits.map((debit) => {
            let date = debit.date.slice(0,10);
            return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
        })
    }

    return (
    	<div>
    	   <h1>Debits</h1>

    	   {debitsView()}
           <form onSubmit={props.addDebit}>
             <input type="text" name="description" />
             <input type="number" name="amount" step=".01" />
             <button type="submit">Add Debit</button>

           </form>

					 <h2><AccountBalance accountBalance={props.accountBalance}/></h2>
					 <Link to="/bank-of-react">Return to Home</Link>

    	</div>

    )
}
export default Debits;
