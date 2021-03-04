import {
  createExplorerLink,
  createExplorerLinkForChain,
} from '@metamask/etherscan-link';

export function transactionMatchesNetwork(transaction, chainId, networkId) {
  if (typeof transaction.chainId !== 'undefined') {
    return transaction.chainId === chainId;
  }
  return transaction.metamaskNetworkId === networkId;
}

/**
 * build the etherscan link for a transaction by either chainId, if available
 * or metamaskNetworkId as a fallback.
 *
 * @param {Object} transaction metadata
 * @returns {string}
 */
export function getBlockExplorerUrlForTx(transaction, rpcPrefs = {}) {
  if (rpcPrefs.blockExplorerUrl) {
    return `${rpcPrefs.blockExplorerUrl.replace(/\/+$/u, '')}/tx/${
      transaction.hash
    }`;
  }
  if (transaction.chainId) {
    return createExplorerLinkForChain(transaction.hash, transaction.chainId);
  }
  return createExplorerLink(transaction.hash, transaction.metamaskNetworkId);
}
