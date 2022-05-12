import './Book.scss';
import { BookUpdateModel, Genre, MultiSelectOption } from '../../Features/BooksLoader/types';
import { FormEvent, useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import { GenreSelect } from '../GenreSelect/GenreSelect';
import {
    useLazyDeleteBookByIDQuery,
    useLazyPatchBookByIDQuery,
    useLazyPostNewBookQuery
} from '../../Features/BooksLoader/BooksAPI';

export interface BookProps {
    id: number,
    isCreator: boolean;
    title: string;
    author: string;
    year: number;
    description?: string;
    genres: Array<Genre>

    onUpdate: () => void;
}

interface BookEditorProps {
    book?: BookProps;
    isCreation: boolean;
    onCancel: () => void;
    onUpdate: () => void;
}

function BookEditor(props: BookEditorProps) {
    const [ selectedGenres, setSelectedGenres ] = useState<Array<MultiSelectOption> | null>(null);
    const [ selectedName, setSelectedName ] = useState<string | null>(null);
    const [ selectedAuthor, setSelectedAuthor ] = useState<string | null>(null);
    const [ selectedDescription, setSelectedDescription ] = useState<string | null>(null);
    const [ selectedYear, setSelectedYear ] = useState<number | null>(null);

    const [ bookCreationTrigger ] = useLazyPostNewBookQuery();
    const [ bookPatchingTrigger ] = useLazyPatchBookByIDQuery();
    const [ bookDeletionTrigger ] = useLazyDeleteBookByIDQuery();

    const saveEditedBook = (ev?: FormEvent<Element>) => {
        ev?.preventDefault();

        if (props.isCreation) {
            bookCreationTrigger({
                name: selectedName || '',
                id: 0,
                author: selectedAuthor || '',
                year: selectedYear || 0,
                genreIds: selectedGenres?.map((option) => option.value) || [],
                description: selectedDescription || '',
            });
        } else {
            let bookPatchingSettings: BookUpdateModel = {id: props.book?.id || 0};
            selectedName && (bookPatchingSettings.name = selectedName);
            selectedDescription && (bookPatchingSettings.description = selectedDescription);
            selectedYear && (bookPatchingSettings.year = selectedYear);
            selectedAuthor && (bookPatchingSettings.author = selectedAuthor);

            bookPatchingTrigger(bookPatchingSettings);
        }

        props.onUpdate();
    }

    const deleteBook = () => {
        props.book && bookDeletionTrigger(props.book.id);
        props.onUpdate(); //TODO: how to check and update automatic?
    }

    return (
        <form onSubmit={saveEditedBook} className="book book_editing">
            <span>Title</span>
            <input
                onChange={(ev) => setSelectedName(ev.target.value)}
                defaultValue={props?.book?.title}
                placeholder="Title"
                type="text"
                className="book__editor-input"
            />
            <span>Author</span>
            <input
                onChange={(ev) => setSelectedAuthor(ev.target.value)}
                defaultValue={props?.book?.author}
                placeholder="Author"
                type="text"
                className="book__editor-input"
            />
            <span>Year</span>
            <input
                onChange={(ev) => setSelectedYear(parseInt(ev.target.value))}
                defaultValue={props?.book?.year || ''}
                placeholder="Year"
                type="text"
                className="book__editor-input"
            />
            <span>Genres</span>
            <GenreSelect
                onChange={(newOption)=> setSelectedGenres(newOption)}
            />
            <span>Description</span>
            <input
                onChange={(ev) => setSelectedDescription(ev.target.value)}
                defaultValue={props?.book?.description}
                placeholder="Description will be here"
                type="text"
                className="book__editor-input"
            />

            <div className="book__editor-actions">
                <input type="submit" className="filters-block__button book__editor-button"/>
                {
                    !props.isCreation &&
                    <button onClick={deleteBook} className="filters-block__button book__editor-button">Delete</button>
                }
            </div>
            <button onClick={props.onCancel} className="book__edit-button">E</button>
        </form>
    );
}

export function Book(props: BookProps) {
    const [isEditing, setEditing] = useState<boolean>(false);

    if (props.isCreator && !isEditing) {
        return (
            <div className="book creator-template">
                <button className="creator-template__button" onClick={() => setEditing(true)}>+</button>
            </div>
        );
    }

    if (isEditing) {
        return (<BookEditor
            onUpdate={props.onUpdate}
            book={props}
            onCancel={() => setEditing(false)}
            isCreation={props.isCreator}
        />);
    }

    return (
        <div className="book">
            <div className="book__main-info">
                <span className="book__title">{props.title}</span>
                <div className="book__written-by">
                    <span className="book__author">{props.author}</span>
                    <span className="book__year">({props.year})</span>
                </div>
            </div>
            <div className="book__genres">
                {props.genres.map((genre, idx) => <span className="book__genre" key={idx}>{genre.name}</span>)}
            </div>
            <button onClick={() => setEditing(true)} className="book__edit-button">E</button>
        </div>
    );
}
