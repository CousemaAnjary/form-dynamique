<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'type',
        'placeholder',
        'required',
        'position',
        'project_id',
    ];

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}