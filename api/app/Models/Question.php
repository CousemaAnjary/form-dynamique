<?php

namespace App\Models;

use App\Models\Option;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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