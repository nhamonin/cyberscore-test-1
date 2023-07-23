export const Error = ({ message }) => {
  return message ? <div className="text-red-600">{message}</div> : null;
};
