import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Post } from "src/environments/interface";

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {}

    getById(id: number): Observable<Post> {
        return this.http.get<Post>(`${environment.DbUrl}/posts/${id}.json`)
        .pipe(map((post: Post) => {
            return {
                ...post,
                id,
                // date: new Date(post.date)
            }
        }))
    }

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.DbUrl}/posts.json`, post)
        .pipe(map((response: {[name: string]: any}) => {
            return {
                ...post,
                id: response.name,
                // date: new Date(post.date)
            }
        }))
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.DbUrl}/posts.json`)
        .pipe(map((response: {[key: string]: any}) => {
            return Object
            .keys(response)
            .map(key => ({
                ...response[key],
                id: key
            }))
        }))
    }

    remove(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.DbUrl}/posts/${id}.json`)
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.DbUrl}/posts/${post.id}.json`, post)
    }
}