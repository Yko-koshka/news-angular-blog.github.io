import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { QuillModule } from "ngx-quill";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { PostComponent } from "./post.component";
import { CommonModule } from "@angular/common";


@NgModule ({
    declarations: [
        PostComponent,
        CreateComponent,
        EditComponent,
        
    ],
    imports: [
        FormsModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        RouterModule.forChild([])
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
    exports: [RouterModule, PostComponent]
})
export class PostModule {}