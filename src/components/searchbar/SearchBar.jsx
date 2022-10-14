import React, {useState} from 'react';

import Input from '../../components/input/Input';
import './SearchBar.css';

import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
    // const [resulSearch, setResultSearch] = useState([]);
    const [term, setTerm] = useState('');

    return (
        <div>
            <Input
                text='Pesquisar'
                type='text'
                icon={<BsSearch />}
                className='sbt input-outline-secondary'
                value={term}
                onchange={(e) => { setTerm(e.target.value) }}
            />
        </div>
    )
}

export default SearchBar