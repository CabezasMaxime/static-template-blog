import CustomError from "../components/CustomError"

function Error({ statusCode }) {
    return (
      <CustomError error={{error: statusCode, title: "error X"}} />
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error