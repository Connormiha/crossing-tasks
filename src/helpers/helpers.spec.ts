import {
    ValidatorResult, landingValidator, depetureValidator,
} from 'games/helpers';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'flux/types';

const mockCollocation = {
    [RIVERSIDE_LEFT]: [],
    [RIVERSIDE_RIGHT]: [],
    [BOAT]: []
};

describe('Games helpers', () => {
    describe('landingValidator', () => {
        it('should get success result', () => {
            let result: ValidatorResult = landingValidator.call({
                rules: {
                    beforeLanding: [
                        {
                            description: '',
                            check() {
                                return true;
                            }
                        },
                        {
                            description: '',
                            check() {
                                return true;
                            }
                        }
                    ]
                }
            }, mockCollocation);

            expect(result).toEqual({success: true});
        });

        it('should get fail result', () => {
            let result: ValidatorResult = landingValidator.call({
                rules: {
                    beforeLanding: [
                        {
                            description: '',
                            check() {
                                return true;
                            }
                        },
                        {
                            description: 'Foo',
                            check() {
                                return false;
                            }
                        }
                    ]
                }
            }, mockCollocation);

            expect(result).toEqual({success: false, message: 'Foo'});
        });
    });

    describe('depetureValidator', () => {
        it('should get success result', () => {
            let result: ValidatorResult = depetureValidator.call({
                rules: {
                    beforeDeparture: [
                        {
                            description: '',
                            check() {
                                return true;
                            }
                        },
                        {
                            description: '',
                            check() {
                                return true;
                            }
                        }
                    ]
                }
            }, mockCollocation);

            expect(result).toEqual({success: true});
        });

        it('should get fail result', () => {
            let result: ValidatorResult = depetureValidator.call({
                rules: {
                    beforeDeparture: [
                        {
                            description: '',
                            check() {
                                return true;
                            }
                        },
                        {
                            description: 'Foo',
                            check() {
                                return false;
                            }
                        }
                    ]
                }
            }, mockCollocation);

            expect(result).toEqual({success: false, message: 'Foo'});
        });
    });
});
