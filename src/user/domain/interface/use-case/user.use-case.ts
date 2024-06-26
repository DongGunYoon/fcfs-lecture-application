import { UserDomain } from '../../model/user.domain';

export const signUpUseCaseSymbol = Symbol.for('SignUpUseCase');

export interface SignUpUseCase {
  execute(name: string): Promise<UserDomain>;
}
