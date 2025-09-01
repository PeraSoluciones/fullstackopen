import type { CoursePart } from '../types';
import Part from './Part';

const Content = (props: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part coursePart={part} />
      ))}
    </div>
  );
};

export default Content;
