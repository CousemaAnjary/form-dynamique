<?php

namespace App\Models;

use App\Models\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'label',
        'question_id',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}