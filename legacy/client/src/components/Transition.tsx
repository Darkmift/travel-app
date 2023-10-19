import { Slide, SlideProps } from '@mui/material';

function TransitionLeft(props: SlideProps) {
  return <Slide {...props} direction={props.direction || 'left'} />;
}

export default TransitionLeft;
