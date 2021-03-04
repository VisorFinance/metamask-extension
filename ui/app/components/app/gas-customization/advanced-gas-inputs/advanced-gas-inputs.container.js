import { connect } from 'react-redux';
import {
  decGWEIToHexWEI,
  decimalToHex,
  hexWEIToDecGWEI,
} from '../../../../helpers/utils/conversions.util';
import { setCustomGasIsExcessive } from '../../../../store/actions';
import AdvancedGasInputs from './advanced-gas-inputs.component';

function convertGasPriceForInputs(gasPriceInHexWEI) {
  return Number(hexWEIToDecGWEI(gasPriceInHexWEI));
}

function convertGasLimitForInputs(gasLimitInHexWEI) {
  return parseInt(gasLimitInHexWEI, 16) || 0;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCustomGasIsExcessive: (isExcessive) => {
      return dispatch(setCustomGasIsExcessive(isExcessive));
    },
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    customGasPrice,
    customGasLimit,
    updateCustomGasPrice,
    updateCustomGasLimit,
  } = ownProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    customGasPrice: convertGasPriceForInputs(customGasPrice),
    customGasLimit: convertGasLimitForInputs(customGasLimit),
    updateCustomGasPrice: (price) =>
      updateCustomGasPrice(decGWEIToHexWEI(price)),
    updateCustomGasLimit: (limit) => updateCustomGasLimit(decimalToHex(limit)),
  };
};

export default connect(null, mapDispatchToProps, mergeProps)(AdvancedGasInputs);
