import React, {
    Navigator
} from 'react-native';
import merge from 'react-native/Libraries/Utilities/buildStyleInterpolator';

var NoTransition = {
    opacity: {
        from: 1,
        to: 1,
        min: 1,
        max: 1,
        type: 'linear',
        extrapolate: false,
        round: 100
    }
};

const Transitions = {
    NONE: {
        ...Navigator.SceneConfigs.FadeAndroid,
        gestures: null,
        defaultTransitionVelocity: 100,
        animationInterpolators: {
            into: merge(NoTransition),
            out: merge(NoTransition)
        }
    }
};

export default Transitions;