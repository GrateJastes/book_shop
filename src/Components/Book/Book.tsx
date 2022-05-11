import './Book.scss';
import { Genre } from '../../Features/BooksLoader/types';

export interface BookProps {
    title: string;
    author: string;
    year: number;
    genres: Array<Genre>
}

export function Book(props: BookProps) {
    return (
        <div className="book">
            <div className="book__main-info">
                <span className="book__title">{props.title}</span>
                <div className="book__written-by">
                    <span className="book__author">{props.author}</span>
                    <span className="book__year">{props.year}</span>
                </div>
            </div>
            <div className="book__genres">
                {props.genres.map((genre) => <span className="book__genre">{genre.name}</span>)}
            </div>
            <button className="book__edit-button">E</button>
        </div>
    );
}
