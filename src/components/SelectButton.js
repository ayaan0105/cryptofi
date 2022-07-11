import './selectButtons.css';

// const SelectButton = ({onClick}) => {
const SelectButton = (props) => {

  const {selected} = props;
  // const useStyles = makeStyles({
  //   selectbutton: {
  //     border: "1px solid gold",
  //     borderRadius: 5,
  //     padding: 10,
  //     paddingLeft: 20,
  //     paddingRight: 20,
  //     fontFamily: "Montserrat",
  //     cursor: "pointer",
  //     backgroundColor: props.selected ? "gold" : "",
  //     color: props.selected ? "black" : "",
  //     fontWeight: props.selected ? 700 : 500,
  //     "&:hover": {
  //       backgroundColor: "gold",
  //       color: "black",
  //     },
  //     width: "22%",
  //     //   margin: 5,
  //   },
  // });

  // const classes = useStyles();

  return (
    // <div>
    <span className={selected ? 'button hello' : 'button'} 
      onClick={props.onClick}>
      {props.children}
      
    </span>
  );
};

export default SelectButton;