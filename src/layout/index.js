import Header from "./Header"

export default (props) => {
    return ( 
        <div>
            <Header />
            {props.children}
        </div>
     );
}
 
