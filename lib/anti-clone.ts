// Anti-clone utilities removed for deployment compatibility

export function getCurrentDomain(): string {
  return 'allowed';
}

export function isCurrentDomainAllowed(): boolean {
  return true;
}

export function enforceClientSideDomainCheck(): void {
  // No domain checking
}

export function useDomainValidation() {
  return {
    isAllowed: true,
    currentDomain: 'allowed',
    isLoading: false,
  };
}

export function logDomainInfo(): void {
  // No logging
}

export function secureConsole(): void {
  // No console security
}

const antiCloneUtils = {
  getCurrentDomain,
  isCurrentDomainAllowed,
  enforceClientSideDomainCheck,
  useDomainValidation,
  logDomainInfo,
  secureConsole,
};

export default antiCloneUtils;