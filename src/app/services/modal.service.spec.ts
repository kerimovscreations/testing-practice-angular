
import { TestBed, inject } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { ModalData, ModalType } from '../models/modal';

fdescribe('ModalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ModalService, AuthService]
        });
    });

    it('should be created', inject([ModalService], (service: ModalService) => {
        expect(service).toBeTruthy();
    }));

    it('should initialize with logged in user', inject([ModalService, AuthService],
        (modalService: ModalService, authService: AuthService) => {
            authService.getIsUserLoggedIn$ = jasmine.createSpy().and.returnValue(of(true));

            const methodSpy = spyOn(modalService, 'showModal');

            expect(methodSpy).not.toHaveBeenCalled();
        }));

    it('should initialize with logged in user', () => {
        const authService = TestBed.get(AuthService);
        authService.getIsUserLoggedIn$ = jasmine.createSpy().and.returnValue(of(true));

        const modalService = TestBed.get(ModalService);
        const methodSpy = spyOn(modalService, 'showModal');

        expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should initialize with logged in user', () => {
        const authService = TestBed.get(AuthService);
        authService.getIsUserLoggedIn$ = jasmine.createSpy().and.returnValue(of(true));
        const methodSpy = spyOn(ModalService.prototype, 'showModal');

        const modalService = TestBed.get(ModalService);

        expect(methodSpy).toHaveBeenCalledTimes(1);
    });

    it('should return correct value from subject', inject([ModalService],
        (modalService: ModalService) => {
            const checkData = new ModalData(ModalType.TYPE_1);
            modalService.getShowModalSubject$().subscribe(data => {
                expect(data).toEqual(checkData);
            });

            modalService.showModalSubject.next(checkData);
        }));

    it('should show TYPE_1 modal', inject([ModalService],
        (modalService: ModalService) => {
            const checkData = new ModalData(ModalType.TYPE_1);
            const subjectSpy = spyOn(modalService.showModalSubject, 'next');

            modalService.showModal(checkData);

            expect(subjectSpy).toHaveBeenCalledTimes(1);
            expect(subjectSpy).toHaveBeenCalledWith(checkData);
        }));

    it('should show TYPE_2 modal', inject([ModalService],
        (modalService: ModalService) => {
            const checkData = new ModalData(ModalType.TYPE_2);
            const subjectSpy = spyOn(modalService.showModalSubject, 'next');

            modalService.showModal(checkData);

            expect(subjectSpy).toHaveBeenCalledTimes(1);
            expect(subjectSpy).toHaveBeenCalledWith(checkData);
        }));
});
