import { Component, ElementRef, ViewChild } from "@angular/core";
import { Istudents } from "src/core/models/student.model";
import { studentsArr } from "src/core/services/student-data.services";

@Component({
    selector: "app-student",
    templateUrl: "./student.component.html",
    styleUrls: ["./student.component.scss"]
})
export class StudentComponent {
    isInEditMode: boolean = false
    students: Istudents[] = studentsArr
    edit_id !: string

    @ViewChild('studentNameRef') studentNameRef !: ElementRef<HTMLInputElement>
    @ViewChild('emailRef') emailRef !: ElementRef<HTMLInputElement>
    @ViewChild('courseRef') courseRef !: ElementRef<HTMLInputElement>
    @ViewChild('feesRef') feesRef !: ElementRef<HTMLInputElement>
    @ViewChild('degreeRef') degreeRef !: ElementRef<HTMLInputElement>
    @ViewChild('cityRef') cityRef !: ElementRef<HTMLInputElement>

    onAddNewStudent() {
        let newStudent: Istudents = {
            id: crypto.randomUUID(),
            sName: this.studentNameRef.nativeElement.value,
            email: this.emailRef.nativeElement.value,
            course: this.courseRef.nativeElement.value,
            fees: +this.feesRef.nativeElement.value,
            degree: this.degreeRef.nativeElement.value,
            city: this.cityRef.nativeElement.value
        }

        this.students.unshift(newStudent)

        this.studentNameRef.nativeElement.value = ''
        this.emailRef.nativeElement.value = ''
        this.courseRef.nativeElement.value = ''
        this.feesRef.nativeElement.value = ''
        this.degreeRef.nativeElement.value = ''
        this.cityRef.nativeElement.value = ''

    }

    onEditStudent(student: Istudents) {
        this.studentNameRef.nativeElement.value = student.sName
        this.emailRef.nativeElement.value = student.email
        this.courseRef.nativeElement.value = student.course
        this.feesRef.nativeElement.value = student.fees.toString()
        this.degreeRef.nativeElement.value = student.degree
        this.cityRef.nativeElement.value = student.city

        this.isInEditMode = true
        this.edit_id = student.id
    }

    onUpdateStudent() {
        let updatedStudent: Istudents = {
            id: this.edit_id,
            sName: this.studentNameRef.nativeElement.value,
            email: this.emailRef.nativeElement.value,
            course: this.courseRef.nativeElement.value,
            fees: +this.feesRef.nativeElement.value,
            degree: this.degreeRef.nativeElement.value,
            city: this.cityRef.nativeElement.value
        }

        let getIndex = this.students.findIndex(ele => ele.id === this.edit_id)
        this.students[getIndex] = updatedStudent


        this.studentNameRef.nativeElement.value = ''
        this.emailRef.nativeElement.value = ''
        this.courseRef.nativeElement.value = ''
        this.feesRef.nativeElement.value = ''
        this.degreeRef.nativeElement.value = ''
        this.cityRef.nativeElement.value = ''

        this.isInEditMode = false
    }

    onRemoveStudent(deleteId: string) {
        let confirmation = confirm("Are You sure, You want to delete this student???")

        if (confirmation) {
            let getIndex = this.students.findIndex(ele => ele.id === deleteId)
            this.students.splice(getIndex, 1)
        }
    }
}



