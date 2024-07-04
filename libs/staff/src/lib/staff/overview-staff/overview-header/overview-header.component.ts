import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CourtGroup, loadCourtGroups, selectAllCourtGroups } from '@org/store';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AddNewBookingComponent } from './add/add-new-booking.component';

@Component({
  selector: 'lib-overview-header',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [CommonModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatDatepickerModule,
    FormsModule
  ],
  templateUrl: './overview-header.component.html',
  styleUrl: './overview-header.component.scss',
})
export class OverviewHeaderComponent implements OnInit{
  selectedCourtGroup: CourtGroup | undefined; // Hold the selected court group
  selectedDate: string = new Date().toISOString().split('T')[0]; // Initialize with today's date in 'yyyy-MM-dd' format
  courtGroupOptions$: Observable<CourtGroup[]>;

  @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private store: Store, public dialog: MatDialog) {
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups).pipe(
      tap(courts => console.log(courts, 'courtGroup')) // Log the court groups to check data
    );
  }

  ngOnInit(): void {
    this.emitFormattedDate(this.selectedDate); // Emit initial date

    this.store.dispatch(loadCourtGroups({pageNumber: 1, pageSize: 10})); // Dispatch action to load courts
    this.courtGroupOptions$.subscribe(courtGroups => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0]; // Set the first item initially
      }
    });
  }

  private emitFormattedDate(date: string): void {
    this.dateSelected.emit(date);
  }

  private formatDate(dateString: string): string {
    const dateParts = dateString.split('-');
    const yyyy = dateParts[0];
    const mm = dateParts[1];
    const dd = dateParts[2];
    return `${yyyy}-${mm}-${dd}`;
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value; // Get the date from the input
    const formattedDate = this.formatDate(selectedDate); // Format it to 'yyyy-MM-dd'
    this.dateSelected.emit(formattedDate); // Emit the formatted date
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddNewBookingComponent, {
      data: { courtGroupId: this.selectedCourtGroup?.id },
    });

    dialogRef.componentInstance.bookingCreated.subscribe(() => {
      // Refresh booking list in OverviewContentComponent
      // You might need to handle this part based on your application structure
      // For example, if OverviewHeaderComponent and OverviewContentComponent are sibling components,
      // you might need to use a shared service or store to communicate between them.
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
