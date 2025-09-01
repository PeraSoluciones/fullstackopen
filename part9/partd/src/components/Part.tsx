import type { CoursePart } from '../types';
import { assertNever } from '../utils/helper';

const Part = (props: { coursePart: CoursePart }) => {
  const narrowTypes = (coursePart: CoursePart) => {
    switch (coursePart.kind) {
      case 'basic':
        return (
          <p style={{ fontStyle: 'italic', margin: '0px' }}>
            {coursePart.description}
          </p>
        );
      case 'group':
        return (
          <p style={{ margin: '0px' }}>
            project exercises {coursePart.groupProjectCount}
          </p>
        );
      case 'background':
        return (
          <>
            <p style={{ fontStyle: 'italic', margin: '0px' }}>
              {coursePart.description}
            </p>
            <p style={{ margin: '0px' }}>
              submit to {coursePart.backgroundMaterial}
            </p>
          </>
        );
      case 'special':
        return (
          <>
            <p style={{ fontStyle: 'italic', margin: '0px' }}>
              {coursePart.description}
            </p>
            <p style={{ margin: '0px' }}>
              required skills: {coursePart.requirements.join(', ')}
            </p>
          </>
        );
      default:
        return assertNever(coursePart);
    }
  };

  return (
    <div key={props.coursePart.name} style={{ marginBottom: '10px' }}>
      <p style={{ fontWeight: 'bold', margin: '0px' }}>
        {props.coursePart.name} {props.coursePart.exerciseCount}
      </p>
      {narrowTypes(props.coursePart)}
    </div>
  );
};

export default Part;
