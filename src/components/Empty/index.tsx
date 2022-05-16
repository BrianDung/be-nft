/* eslint-disable import/no-anonymous-default-export */

export default (props: { text: string }) => {
  return (
    <div style={{ textAlign: "center",fontFamily:'Montserrat-Regular',fontSize:'17px', marginTop: "15%", color:'#FFFFFF' }}>
      <img src="/images/empty.svg" alt="icon"/>
      <p style={{opacity:'0.4'}}>{props.text}</p>
    </div>
  );
};
