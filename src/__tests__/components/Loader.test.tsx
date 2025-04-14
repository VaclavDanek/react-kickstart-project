import renderer from 'react-test-renderer'

// components
import { Loader } from '../../components'

// stores
import GeneralStore from '../../stores/GeneralStore'

describe('Loader', () => {
  it('should render null when is not fetching', () => {
    const tree = renderer.create(<Loader active={GeneralStore.fetching > 0} />).toJSON();
    expect(tree).toBeNull();
  });

  it('should render Loader while fetching', () => {
    GeneralStore.startFetching();
    const tree = renderer.create(<Loader active={GeneralStore.fetching > 0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});