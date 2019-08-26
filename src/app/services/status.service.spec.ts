import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatusResponse } from '../models/response';
import { StatusService } from './status.service';

describe('StatusService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StatusService]
        });
    });

    afterEach(inject([HttpTestingController],
        (backend: HttpTestingController) => {
            backend.verify();
        })
    );

    it('should be created', inject([StatusService], (service: StatusService) => {
        expect(service).toBeTruthy();
    }));

    it('should get service data', inject([StatusService, HttpTestingController],
        fakeAsync((statusService: StatusService, backend: HttpTestingController) => {

            const mockResponse = new StatusResponse(200, 'Success');
            const printMethodSpy = spyOn(statusService, 'printConsole');

            statusService.startPeriodicCheck();

            tick(10005);

            backend.expectOne({
                url: 'https://demo1734473.mockable.io/ping',
                method: 'GET'
            }).flush(mockResponse);

            tick(10005);

            backend.expectOne({
                url: 'https://demo1734473.mockable.io/ping',
                method: 'GET'
            }).flush(mockResponse);

            expect(printMethodSpy).toHaveBeenCalledWith('success');
            expect(printMethodSpy).toHaveBeenCalledTimes(2);

            statusService.stopPeriodicCheck();
        })));
});
