import { Injectable } from "@angular/core";
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(private toastrService: NbToastrService) {}

  showToast(title:string, desc:string,duration: number, status: string, quantidade:number) {
    this.toastrService.show(`${desc}`, `${title}`, { position: this.logicalPositions.TOP_END, duration: duration, status: status,limit: quantidade });
  }
}
